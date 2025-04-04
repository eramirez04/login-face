/* environment:
      - POSTGRES_HOST=db            # <--- La juega: usar el nombre del servicio
      - POSTGRES_PORT=5436
      - POSTGRES_USERNAME=postgres
      - POSTGRES_PASSWORD=postgres
      - POSTGRES_DATABASE=micro
      - POSTGRES_SSL=false
      - PORT=3000
      - DB_TYPE=postgres

      - REDIS_HOST="localhost"
      - REDIS_PORT=6379
      - REDIS_DB=0
      
      


      command: >
      sh -c "npm run migration:prod"
      
      
      */