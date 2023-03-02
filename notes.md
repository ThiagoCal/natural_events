## use EONET API

## List of events we need to use:
-- category
    -wildfires
    -volcanoes

    -in case we want to add more later, some ideas:
    --landslides
    --floods
    --earthquakes


## Calculating radius
-- 632.42 km (to sicily)

## filter according to country 
--using map - create new array of only the country of choice
-- .includes('italy') && ofc .toLowerCase(   )

## save all events in the past 180 days
--update (truncate table) and insert new info every 7 days with setTimeOut()

## DISPLAY
-- google map api - to present a map
    -- create a filtering option (dropdown according to natural disaster, also option to see all)
    -- recieves events location -> present it on the map with a pin based on filtering option
    -- present a modal with info (date, name, location(coordinates),  magnitudeValue)

