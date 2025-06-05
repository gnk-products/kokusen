# KOKUSEN

KOKUSEN is a game where you guess which country a Google Maps Street View image is from.  
The candidate countries are either 2 or 3, and the combinations are intentionally challenging to predict.  
For example, Czech Republic vs. Slovakia, or Latvia vs. Lithuania.  

## ✨ Features
- Number of questions can be customized between 5 and 30  
- Movement within Street View is disabled  
- 360° rotation and zoom are allowed  
- Around 30 country combinations available  

## Screenshots
#### Stock charts
![simplewallscreenshot01](https://github.com/user-attachments/assets/b6910942-3455-4b97-82f9-b9ead2d2667e)

#### Ticker trades
![simplewallscreenshot03](https://github.com/user-attachments/assets/49a86218-4525-4728-9a68-6ed44ff4df7b)

#### Tickers news
![simplewallscreenshot02](https://github.com/user-attachments/assets/2555b82d-747f-47a7-bd73-041b3aa10b63)

### Tickers meta information
![simplewallscreenshot04](https://github.com/user-attachments/assets/3a7bc03f-5ede-4cd7-9579-de1dd41f5994)


## 🚀 Quick Start

To run this application, you need a Google Maps API key.    
Please generate a key with the following permissions in the GCP Console:    

```
Maps JavaScript API
Street View Static API
```

Then you have to update the `NEXT_PUBLIC_GOOGLE_ACCESS_KEY` in docker-compose.yaml.

### Run the service
```bash
docker compose up kokusen-service
```

### Set up the database (Prisma)
```bash
docker-compose exec kokusen-service yarn prisma migrate reset
```

### Open your browser
open http://localhost:3062

## 🛠 Technologies Used
- **Backend**: Next.js
- **Frontend**: React + Material-UI (MUI)
- **Database**: MySQL
- **ORM**: Prisma
- **World Map**: leafletjs

## 📜 License

**MIT**
