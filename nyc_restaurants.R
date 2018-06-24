library(ggmap)
library(tidyverse)
library(sp)
library(rgdal)
library(httr)
library(jsonlite)
library(leaflet)

# use tutorial from https://cengel.github.io/rspatial/5_Geocoding.nb.html

restaurants <- read_csv("nyc_restaurant_list.csv")

# concatenate name and borough
restaurants_place <- ifelse(restaurants$Neighborhood == "Astoria",
                              paste(restaurants$Name, "Astoria, NY"),
                            ifelse(restaurants$Borough == "Brooklyn",
                                   paste(restaurants$Name, "Brooklyn, NY"),
                                   paste(restaurants$Name, "New York, NY")))

restaurants_coords <- geocode(restaurants_place)

restaurants <- data.frame(cbind(restaurants, restaurants_coords))

restaurants <- restaurants %>% filter(!is.na(lon) & !is.na(lat)) # remove NA geocoding results
coordinates(restaurants) <- c("lon", "lat") 
proj4string(restaurants) <- CRS("+proj=longlat +ellps=WGS84 +datum=WGS84 +no_defs")
writeOGR(restaurants, ".", "restaurants_with_coords", driver="ESRI Shapefile")


content <- paste("<strong>",restaurants$Name,"</strong>","<br/>",
                 "Cuisine:",restaurants$Cuisine,"<br/>")

leaflet(restaurants) %>%  
  addTiles() %>% 
  setView(lng = -74, lat = 40.75, zoom = 12 ) %>%
  addMarkers(restaurants$lon, restaurants$lat, popup=content) %>%
  # addProviderTiles("HERE.normalDay")
# addProviderTiles("Esri.WorldTopoMap")
# addProviderTiles("Esri.WorldStreetMap")
  addProviderTiles("Stamen.Watercolor")
