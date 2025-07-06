## Running the app

### With docker
1. Make sure you have Docker installed and running (https://www.docker.com/products/docker-desktop/)
2. Open a bash terminal shell in the project's root directory
3. Build the image using the command ```docker build -t silviu-fe-challange .```
4. Run the container with ```docker run --rm -p 4173:4173 -d --platform linux/amd64 --env-file .env silviu-fe-challange``` (replace the 4173 on the left with your desire port, to run it at port 3000 use -p 3000:4173), after running this command you will get a hash, like this ```c7a249c293c19cea6d8872f91d42adb4301010215f64c1e8d1f9721920dfa982```
5. Open a browser and navigate to locahost:4173 (or your port)
6. To remove the container and image from your machine run
    1. ```docker stop c7a249c293c19cea6d8872f91d42adb4301010215f64c1e8d1f9721920dfa982``` (replace with your own hash) this will remove the container due to the ```--rm``` flag
    2. ```docker rmi silviu-fe-challange```

### Without Docker

1. Make sure you have Node version ```21.7.3``` installed, preferrably using ```nvm``` (node version manager)
    1. ```nvm install 21.7.3```
    2. ```nvm use 21.7.3```
2. Run ```npm install```
3. The app can be started using:
    1. ```npm run dev``` (development mode - defaults toport 5173)
    2. ```npm run build && npm run preview``` (build - prod mode - default to port 4173)
    3. ```npm run test``` (to run the tests)

## Limitations/Improvements

- search should be improved to be able to do a basic fuzzy search, for example "gmtalks_youtube" should be matchable by both the exact substring "gmtalks" but also "gm talks" or "gm youtube" or "talks youtube"

- query caching should be implemented for the routes that are unlikely to have much change, for example the country route is very static by nature, in there a high expirty date should be set, whereas the grandmasters list is more dynamic, but still not real time so a lower expiry cache would help here, the tool of choice for this would be "react-query"

- generally, a tool such as "react-query" is useful in reducing the high amount of boilerplate code needed for requests (such as loading and error states)

- not using a global state library such as "zustand" or "redux" was a deliberate choice due to time constrains, but in production apps they are very much needed

- more extensive testing is needed, right now it's at a very basic, level, again this was due to time constraints, in a production app more testing would be needed, and of different varierty (such as integration testing)

- general code improvements, such as using enums for known magic strings or numbers, for example checking e.code === "ERR_CANCELED" as an example

- general error handling is not implemented for non-request errors

- semantic markup improvements are needed in some areas

- error handling could have better UI/UX, ideally I'd have a retry button, and in addition I'd also have a retry mechanism for the requests (yet again done using "react-query")

- goes without saying that getting thousands of entries and filtering them on the frontend is unusual and not a good practice as it usually leads to poor performance, there is nuance to this however, in this example the data fetched is very slim (only an array of username), in addition the size of the data is unlikely to grow at a large rate, the rate at which this becomes a performance bootleneck would be in the 10.000+ (if not more) in this specific example

- usually, .env files aren't a part of the git repo, in this case it was left there to facilitate ease of running the app

- removing unused npm packages is needed
