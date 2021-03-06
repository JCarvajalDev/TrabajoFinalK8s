# Agenda de Contactos Proyecto Educativo
> Proyecto creado en Node y React adaptado a Docker con Kubernetes.

###### [Fuentes Originales](https://github.com/Brandon05/Address-Book-)
###### [Fuentes Modificado](https://github.com/JCarvajalDev/TrabajoFinalK8s)

![screenshot](https://github.com/JCarvajalDev/TrabajoFinalK8s/blob/master/screenshot.png)

## Caracteristicas
- Es un CRUD de una agenda de contactos (Node, React, nginx) con conexion a MySQL
- Aplicación docker con kubernetes en google cloud
- Uso de service account 
- Uso de secret kubernetes
- Uso de proxy cloud sql

## Uso
> Preparativos:

- Tener una cuenta google cloud `(obligatorio)` [Link](https://cloud.google.com/)
- Tener Docker instalado localmente `(obligatorio)` [Link](https://docs.docker.com/get-started/)
- Descargar el código fuente de este proyecto `(obligatorio)` [Link](https://github.com/JCarvajalDev/TrabajoFinalK8s)
###### si usa git puede usar el siguiente comando
```sh
git clone https://github.com/JCarvajalDev/TrabajoFinalK8s.git
```
- Instalar [node](https://nodejs.org/es/) y kubernetes localmente `(opcional)`

## Configuraciones Google Cloud (GCP) y Terminal 

- En la terminal local inciamos el comando
```sh
gcloud init
```
- Descargar los componentes de gcloud en la terminal local
```sh
gcloud components install kubectl
```
- Permitir a Docker local poder trabajar con gcp
```sh
gcloud auth configure-docker
gcloud auth login
```
- En la terminal local una vez ejecutado y validado con GCP crear un proyecto.
```sh
gcloud projects create proyecto-final-jc --name="Proyecto-Final-JC"
```
- En la terminal local asociamos el proyecto recientemente creado
```sh
gcloud config set project proyecto-final-jc
```
- En la plataforma web de GCP es necesario tener habilitado lo siguiente:
- [x] `Facturacion al proyecto creado`
- [x] `API de Container Engine`
- [x] `API Manager`
- [x] `API Google Cloud SQL`
- [x] `API Container Registry`

- En GCP crear un cluster de tipo estandar.
```sh
gcloud container clusters create cluster-pf --zone=us-east1-b --machine-type=g1-small --num-nodes=3
```
```sh
gcloud container clusters get-credentials cluster-pf
```

- En [GCP](https://console.cloud.google.com/) usar un servicio de SQL de tipo (MYSQL) `versión 5.6`, los datos que ingresará son importantes por favor recordar ya que serán requeridos en los siguientes pasos (Nombre de la conexión `Backend->deployment.yaml`, Usuario `env->secret`, Contraseña `env->secret`, Nombre BBDD `env->secret`)
###### Crear una BBDD en mysql con el nombre (contactos).
###### Crear un usuario de mysql con acceso a la BBDD contactos.
> Recomendaciones al crear instancia SQL: 
`id de instancia: mysqlpf`
`Version bbdd: MYSQL 5.6`
`Region: us-east1`
`Zona: Unica`
`Tipo Maquina: Ligera`
`Tipo Almacenamiento: HDD y 10GB`

- En GCP crear cuenta de servicio `(Service Account)` con Rol `cloudsql.client` y generar la key de tipo JSON.
```sh
gcloud iam service-accounts create sql-cloud-pf --display-name="svc accounts sql" --description="Cuenta para SQL PF"
```
```sh
gcloud projects add-iam-policy-binding proyecto-final-jc \
 --member serviceAccount:sql-cloud-pf@proyecto-final-jc.iam.gserviceaccount.com \
 --role roles/cloudsql.client
```
```sh
 gcloud iam service-accounts keys create \
--iam-account sql-cloud-pf@proyecto-final-jc.iam.gserviceaccount.com credenciales-sql-p.json
```
```sh
kubectl create secret generic cloudsql-credentials-p --from-file=credenciales-p.json=credenciales-sql-p.json
```
- Crear otro secret ahora para las variables de entorno MYSQL
```sh
kubectl create secret generic claves-proyecto-final \
--from-literal=DB_PASS=LA CONTRASEÑA DEL USAURIO QUE CREO EN MYSQL \
--from-literal=DB_USER=EL USUARIO QUE CREO EN MYSQL \
--from-literal=DB_NAME=contactos \
--from-literal=DB_HOST=localhost \
--from-literal=DB_PORT=3306
```

## Configuraciones en el proyecto `Backend`
- En la carpeta Backend del proyecto modificar el deployment.yaml
###### en la linea 34 donde dice Tu Nombre de la conexión MYSQL debes colocar la que te entrego GCP en la instancia MySQL esto lo hacemos porque se configuró en este proyecto con un proxy seguro de conexión `(cloud_sql_proxy)` entre el cluster y la instancia MySQL
![ejemplo](https://github.com/JCarvajalDev/TrabajoFinalK8s/blob/master/line34-con.png)

## Creando Imagenes, Subiendo y desplegando

- 1) El `Backend` por lo cual debe estar dentro de la carperta en la terminal
```sh
cd Backend
docker build -t us.gcr.io/proyecto-final-jc/nodeback .
docker push us.gcr.io/proyecto-final-jc/nodeback
kubectl apply -f deployment.yaml
```

- 2) El `Frontend` por lo cual debe estar dentro de la carperta en la terminal
```sh
cd Frontend
docker build -t us.gcr.io/proyecto-final-jc/nodefront .
docker push us.gcr.io/proyecto-final-jc/nodefront
kubectl apply -f deployment.yaml
```

- 3) Necesitamos averiguar la ip pública donde se desplego nuestra aplicación en la web para ello ejecutamos el siguiente comando 

```sh
kubectl get services
```
######  se debe esperar un poco hasta que el servicio svc-nodeback-nodefront entregue la ip pública por ende debe ejecutar el comando anterior las veces que sea necesario.








