### Welcome to the bird app  
# Version - 1.0.1
# Stack: Next.js, Typescript, SCSS

This application allows you to search through a large index of North American birds. 

It currently uses the nuthatch API found here for the list of birds:
https://nuthatch.lastelm.software/swagger.html 


How to run:
1. Navigate to the /bird-app folder
2. Run "npm install"
3. Run "npm run dev"
4. Navigate to http://localhost:5173 in your browser to see the application. 


Current features:
-------------------------
- Loads all birds found in Nuthatch API in alphabetical order
- Displays name, photo(s), and scientific name
- Search bar returns birds by name or scientific name
- Displays count of birds in index in the filter sidebar

TODO:
-------------------------
- Add filtering for Color, size, region and location
- Add detail pages for birds
  - Will include sounds, maps, and more details on that specific bird
- Add pop up on click to see a quick overview of the bird before taking you to a detail page
- Add "seen" feature so user can keep track of birds sighted. 
