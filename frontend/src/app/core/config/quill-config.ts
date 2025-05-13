import { QuillModules } from 'ngx-quill';

// Définir l'interface pour la configuration Quill
export interface QuillConfig {
  modules: {
    toolbar: any[];
    cursors?: any;
  };
  placeholder: string;
  theme: string;
}

// Créer la configuration avec le bon typage
export const quillConfig: QuillConfig = {
  modules: {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
      ['blockquote', 'code-block'],
      [{ 'header': 1 }, { 'header': 2 }],               // custom button values
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
      [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
      [{ 'direction': 'rtl' }],                         // text direction
      [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
      [{ 'font': [] }],
      [{ 'align': [] }],
      ['clean'],                                         // remove formatting button
      ['link', 'image', 'video']                         // link and image, video
    ],
    cursors: {
      transformOnTextChange: true,
      hideDelayMs: 5000,
      hideSpeedMs: 500
    }
  },
  placeholder: 'Commencez à rédiger votre document...',
  theme: 'snow'
};
