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
#### Select the match
![kokusenscreenshot01](https://github.com/user-attachments/assets/6f78ab2b-621c-47ea-a9f5-724fe242371e)

#### Select the country
![kokusenscreenshot02](https://github.com/user-attachments/assets/1ed74f3b-9788-4ed9-b066-ccd68ea9de45)

#### The answer
![kokusenscreenshot03](https://github.com/user-attachments/assets/7fc8412a-63ae-4ecd-9b92-1ff7597f2f96)


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
docker-compose up kokusen-service
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
