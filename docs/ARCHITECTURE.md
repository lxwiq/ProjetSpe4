# Architecture Redis

## Vue d'ensemble

L'application utilise Redis comme système de cache et de stockage temporaire pour améliorer les performances et permettre la scalabilité horizontale. Redis est utilisé pour plusieurs fonctionnalités clés:

1. **Gestion des sessions**: Les sessions utilisateur sont stockées dans Redis via connect-redis
2. **Cache de requêtes**: Les réponses API fréquemment demandées sont mises en cache
3. **Rate limiting**: Les compteurs de limitation de taux sont persistants entre les instances
4. **Documents en temps réel**: L'état des documents actifs est synchronisé via Redis
5. **WebSockets distribués**: Socket.IO utilise Redis comme adaptateur pour la communication entre instances

## Configuration

### Variables d'environnement

```
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=optional_password
REDIS_TLS=false
```

### Installation pour le développement

#### Option 1: Docker

```bash
docker run --name redis -p 6379:6379 -d redis:alpine
```

#### Option 2: Installation locale

- **macOS**: `brew install redis` puis `brew services start redis`
- **Linux**: `sudo apt install redis-server` puis `sudo systemctl start redis`
- **Windows**: Installer via WSL2 ou télécharger Redis pour Windows

## Architecture de cache

### Stratégie de cache

- **Documents**: Cache de 5 minutes
- **Utilisateurs**: Cache de 10 minutes
- **Invalidation**: Automatique lors des opérations d'écriture (POST, PUT, DELETE)

### Clés Redis

- **Sessions**: `session:{id}`
- **Cache API**: `cache:{route}:{userId}:{queryParams}`
- **Rate Limiting**: `ratelimit:{ip}:{route}`
- **Documents actifs**: `doc:{id}`, `doc:users:{id}`, `doc:cursors:{id}:{userId}`

## Considérations pour la production

### Redis Cluster

Pour les environnements de production à haute disponibilité, il est recommandé d'utiliser Redis Cluster:

1. Configuration minimale: 3 nœuds maîtres et 3 nœuds réplicas
2. Utiliser des instances dédiées avec mémoire suffisante
3. Configurer la persistance (AOF + RDB)

### Redis Sentinel

Pour une haute disponibilité sans sharding:

1. 1 nœud maître avec 2+ réplicas
2. 3+ sentinelles pour la détection de défaillance et le basculement

### Surveillance

Métriques importantes à surveiller:

- Utilisation de la mémoire
- Taux de succès/échec du cache (hit/miss ratio)
- Latence des opérations
- Connexions actives

### Dépannage

Problèmes courants:

1. **Connexion refusée**: Vérifier les paramètres de connexion et le pare-feu
2. **Mémoire insuffisante**: Augmenter la mémoire ou configurer la politique d'éviction
3. **Latence élevée**: Vérifier la charge réseau et les opérations bloquantes
