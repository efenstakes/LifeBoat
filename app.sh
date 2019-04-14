#!bin/sh

# @author efen
# to help with common command-line tasks like generating documentation
# incase of windows   `$'\r': command not found` errors run   sed -i 's/\r$//' app.sh     to resolve it

# take command line command that is passed
action=$1

echo_help() {
    echo "-h or help command helps offer help to LifeBoat app users"
    echo "You can use any of these commands to interface with the application"
    echo ""
    echo -e '\t make-docs  --> This command helps generate documentation which is stored in docs/'
    echo -e "\t -h or help  --> This command offers help to users"
    echo -e "\t -h or help  --> This command offers help to users"
    echo -e "\t prepare  --> This command installs all the npm libraries the server requires"
    echo -e "\t start  --> This command starts the server"

    echo -e  ""
    echo -e  "\t\t\t\t END"
    echo -e  ""
    echo -e  "Author Efen"
}


case $action in
   help)
    echo_help
   ;;

   -h) 
    echo_help
    echo 'help' 
    ;;
    
   prepare)
    npm i 
    ;;

   start)
    npm start 
    ;;

   make-docs)
    npm run-script make-docs 
    ;; 

   test)
    npm test
    ;;

   *)
    echo_help
    ;;

esac

