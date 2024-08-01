# Adviso


# REVIEW : 

## Global pattern : 
- .gitignore uses for ignoring files when pushing to git ( here we don't need node_modules for both backend&frontend ) should handle them to gitignore 
- so the .gitignore in root dir is used for commun entire app suck as docker ( future feature ) ! we need .gitignore for server + .gitignore for client ! 
- I need to understand why you handle manually the static rendering in setup.js !! Already react uses this automatically !!


## Server : 
- ![image](https://github.com/user-attachments/assets/2945a462-34ed-45b7-bf3a-07da2ee5abf3) here we need .env file + integrate environment with express js ( google search : dotenv and how to configure with express js )
- Its crucial part since we'll hide all specific credentials there !! 
- need env for server/config/config.json : NO SENSITIVE CREDENTIALS VISIBLE IN APP CODE ( easy to cyber attack )
- about pattern : package by feature | | package by entity ( google search to better understand )
  the route here is the last layer that connect to frontend ! so it shouldn't allow visible code ! we need the abstraction ( here is an example : server/routes ( call the controller method and add the prefix ( the route path like /users/getOne ) )
                     server/controllers ( call the service layer that read and write directly from database )
                     server/services ( here you can make all your logic and checks 


## Frontend : 
- I appreciate a lot the way that you kinda try to clone react logic starting by npm init -y + start adding logics !! OKAY for now , but in roadtrip to code we'll need a lot of config 
- here the CRA ( npx create-react-app ) is deprecated ( no update since a while ) , so we can't use CRA anymone
- ALTERNATIVES : Next js ( too hard for begginer ) | | vite ( developer friendly ) 


