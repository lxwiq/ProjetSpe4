import { Component, ElementRef, EventEmitter, Input, Output, ViewChild, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpEventType, HttpErrorResponse } from '@angular/common/http';
import { finalize, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

import { LoggingService } from '../../../core/services/logging.service';

export interface FileUploadResult {
  success: boolean;
  data?: any;
  error?: string;
}

export interface FileUploadOptions {
  title?: string;
  parentFolderId?: number | null;
  [key: string]: any;
}

@Component({
  selector: 'app-file-upload',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './file-upload.component.html'
})
export class FileUploadComponent {
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  @Input() acceptedFileTypes: string = '*'; // Par défaut, accepte tous les types de fichiers
  @Input() maxFileSize: number = 25 * 1024 * 1024; // 25MB par défaut
  @Input() uploadUrl: string = ''; // URL pour l'upload
  @Input() multiple: boolean = false; // Permettre la sélection multiple
  @Input() showPreview: boolean = true; // Afficher la prévisualisation
  @Input() autoUpload: boolean = false; // Upload automatique après sélection
  @Input() additionalData: FileUploadOptions = {}; // Données additionnelles à envoyer avec le fichier

  @Output() fileSelected = new EventEmitter<File[]>();
  @Output() uploadComplete = new EventEmitter<FileUploadResult>();
  @Output() uploadProgress = new EventEmitter<number>();

  private http = inject(HttpClient);
  private logger = inject(LoggingService);

  // Signaux pour l'état du composant
  selectedFiles = signal<File[]>([]);
  previews = signal<{file: File, preview: string}[]>([]);
  progress = signal<number>(0);
  isUploading = signal<boolean>(false);
  uploadError = signal<string | null>(null);
  uploadSuccess = signal<boolean>(false);

  /**
   * Déclenche le dialogue de sélection de fichier
   */
  triggerFileInput(): void {
    this.fileInput.nativeElement.click();
  }

  /**
   * Gère la sélection de fichiers
   */
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (!input.files || input.files.length === 0) {
      return;
    }

    // Convertir FileList en array
    const files: File[] = Array.from(input.files);

    // Valider les fichiers
    const validFiles = this.validateFiles(files);

    if (validFiles.length === 0) {
      return;
    }

    // Mettre à jour les fichiers sélectionnés
    this.selectedFiles.set(validFiles);

    // Générer les prévisualisations
    if (this.showPreview) {
      this.generatePreviews(validFiles);
    }

    // Émettre l'événement de sélection
    this.fileSelected.emit(validFiles);

    // Upload automatique si activé
    if (this.autoUpload) {
      this.uploadFiles();
    }
  }

  /**
   * Valide les fichiers sélectionnés
   */
  private validateFiles(files: File[]): File[] {
    return files.filter(file => {
      // Vérifier la taille
      if (file.size > this.maxFileSize) {
        this.uploadError.set(`Le fichier "${file.name}" dépasse la taille maximale autorisée (${this.formatFileSize(this.maxFileSize)}).`);
        return false;
      }

      // Vérifier le type si des types spécifiques sont acceptés
      if (this.acceptedFileTypes !== '*') {
        const fileType = file.type.toLowerCase();
        const acceptedTypes = this.acceptedFileTypes.split(',').map(type => type.trim().toLowerCase());

        // Vérifier si le type MIME correspond ou si l'extension correspond
        const isValidType = acceptedTypes.some(type => {
          if (type.startsWith('.')) {
            // Vérifier l'extension
            return file.name.toLowerCase().endsWith(type);
          } else {
            // Vérifier le type MIME
            return fileType.includes(type) || type === '*';
          }
        });

        if (!isValidType) {
          this.uploadError.set(`Le fichier "${file.name}" n'est pas d'un type autorisé.`);
          return false;
        }
      }

      return true;
    });
  }

  /**
   * Génère des prévisualisations pour les fichiers
   */
  private generatePreviews(files: File[]): void {
    const newPreviews: {file: File, preview: string}[] = [];

    files.forEach(file => {
      // Vérifier si c'est une image
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = () => {
          newPreviews.push({
            file,
            preview: reader.result as string
          });

          // Mettre à jour les prévisualisations
          this.previews.set([...newPreviews]);
        };
        reader.readAsDataURL(file);
      } else {
        // Pour les autres types de fichiers, utiliser une icône générique
        newPreviews.push({
          file,
          preview: this.getFileIconByType(file.type)
        });
      }
    });

    // Si aucune image n'a été traitée, mettre à jour les prévisualisations
    if (files.every(file => !file.type.startsWith('image/'))) {
      this.previews.set(newPreviews);
    }
  }

  /**
   * Retourne une icône en fonction du type de fichier
   */
  private getFileIconByType(fileType: string): string {
    if (fileType.includes('pdf')) {
      return 'assets/icons/pdf-icon.svg';
    } else if (fileType.includes('word') || fileType.includes('document')) {
      return 'assets/icons/doc-icon.svg';
    } else if (fileType.includes('excel') || fileType.includes('sheet')) {
      return 'assets/icons/xls-icon.svg';
    } else if (fileType.includes('zip') || fileType.includes('rar') || fileType.includes('compressed')) {
      return 'assets/icons/zip-icon.svg';
    } else if (fileType.includes('text')) {
      return 'assets/icons/txt-icon.svg';
    } else {
      return 'assets/icons/file-icon.svg';
    }
  }

  /**
   * Supprime un fichier de la sélection
   */
  removeFile(index: number): void {
    const currentFiles = this.selectedFiles();
    const currentPreviews = this.previews();

    // Supprimer le fichier
    const newFiles = [...currentFiles];
    newFiles.splice(index, 1);
    this.selectedFiles.set(newFiles);

    // Supprimer la prévisualisation
    const newPreviews = [...currentPreviews];
    newPreviews.splice(index, 1);
    this.previews.set(newPreviews);

    // Réinitialiser les messages d'erreur
    this.uploadError.set(null);
  }

  /**
   * Réinitialise le composant
   */
  reset(): void {
    this.selectedFiles.set([]);
    this.previews.set([]);
    this.progress.set(0);
    this.isUploading.set(false);
    this.uploadError.set(null);
    this.uploadSuccess.set(false);

    // Réinitialiser l'input file
    if (this.fileInput) {
      this.fileInput.nativeElement.value = '';
    }
  }

  /**
   * Upload les fichiers sélectionnés
   */
  uploadFiles(): void {
    const files = this.selectedFiles();

    if (files.length === 0) {
      this.uploadError.set('Aucun fichier sélectionné.');
      return;
    }

    if (!this.uploadUrl) {
      this.uploadError.set('URL d\'upload non spécifiée.');
      return;
    }

    this.isUploading.set(true);
    this.progress.set(0);
    this.uploadError.set(null);
    this.uploadSuccess.set(false);

    const formData = new FormData();

    // Ajouter les fichiers au FormData
    if (this.multiple) {
      files.forEach((file, index) => {
        formData.append('file' + index, file, file.name);
      });
    } else {
      formData.append('file', files[0], files[0].name);
    }

    // Ajouter les données additionnelles au FormData
    if (this.additionalData) {
      Object.keys(this.additionalData).forEach(key => {
        if (this.additionalData[key] !== null && this.additionalData[key] !== undefined) {
          formData.append(key, this.additionalData[key]);
        }
      });
    }

    // Log des données envoyées
    this.logger.info('Données envoyées pour l\'upload', {
      component: 'FileUploadComponent',
      files: files.map(f => ({ name: f.name, size: f.size, type: f.type })),
      additionalData: this.additionalData
    });

    // Envoyer la requête
    this.http.post(this.uploadUrl, formData, {
      reportProgress: true,
      observe: 'events',
      withCredentials: true
    }).pipe(
      catchError((error: HttpErrorResponse) => {
        this.logger.error('Erreur lors de l\'upload', {
          component: 'FileUploadComponent',
          error: error.message
        });

        this.uploadError.set(error.message || 'Une erreur est survenue lors de l\'upload.');
        this.isUploading.set(false);

        return throwError(() => error);
      }),
      finalize(() => {
        this.isUploading.set(false);
      })
    ).subscribe(event => {
      if (event.type === HttpEventType.UploadProgress && event.total) {
        const percentDone = Math.round(100 * event.loaded / event.total);
        this.progress.set(percentDone);
        this.uploadProgress.emit(percentDone);
      } else if (event.type === HttpEventType.Response) {
        this.uploadSuccess.set(true);
        this.uploadComplete.emit({
          success: true,
          data: event.body
        });
      }
    });
  }

  /**
   * Formate la taille d'un fichier en unités lisibles
   */
  formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }
}
