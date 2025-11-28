"C:\Program Files\PostgreSQL\18\bin\pg_dump.exe" -h localhost -p 5432 -U postgres -Fc -d "reanime-user-service-for-development" -f "T:\emw\production\postgresql-backup-data\dev.dump"

"T:\emw\production\postgresql-backup-data"



& "C:\Program Files\PostgreSQL\18\bin\pg_restore.exe" `
   -h localhost -p 5432 -U postgres `
   -d "reanime-user-service-for-production" `
   --no-owner `
   "T:\emw\production\postgresql-backup-data\dev.dump"


& "C:\Program Files\PostgreSQL\18\bin\pg_restore.exe" `
   -h localhost -p 5432 -U postgres `
   -d "reanime-user-service-for-production" `
   --no-owner `
   "T:\emw\production\postgresql-backup-data\dev.dump"