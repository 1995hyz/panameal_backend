# panameal
# Description:
  We have designed an asymmetric social media platform, Panameal. Panameal aims to provide users a way of sharing their stories of food. Users can post their experience, such as recipes and cooking procedures, on the platform. Users can also view other users’ posts and learn to cook new dishes from these posts.
# Team Members:
  Ali Rahman, Nithi Subbaian, Kevin Lin, Yingzhi Hao
# Build-Description:
  We use Maven as our build tool. The Maven file is under the path, "panameal/pom.xml". To build the jar file of our program, run "mvn package".   
# NginX configuration on Virtual Machine
  In our project, we used NginX as a reverse proxy server on a Virtual Machine. 

We used NginX to serve the static build file generated from React and be a proxy server to the Backend which was run using a Jar file. NginX was set up to listen on port 8000 and reverse proxy to port 8080 where the backend was set up to listen on.

To install NginX use the command: sudo apt-get install nginx on the VM, and follow through the installation steps provided on: https://docs.nginx.com/nginx/admin-guide/installing-nginx/installing-nginx-open-source/.

There are different possible configurations for NginX, the one used for this project is in the NginxConfig file. Note that the server block that is present in sites-enabled file is what is used by Nginx. More documentation on NginX is on their website: https://docs.nginx.com/ .

Make sure to update the Frontend to send and the Backend to listen to the VM IP address and specific port for your application.

Next, the jar file was generated in intelliJ and the build file was generated by entering the Frontend directory and running “yarn run build”.

The command “scp -P <port #> <file name> username@remotehost:/some/remote/directory” was used to transfer files from current machine to Virtual machine. The files were zipped using “zip -r <filename.zip> <filename>” before they were sent.

On the VM, the Jar file was run in the background using the command “nohup sudo java -Dserver.port=8080 -jar <jarfile> &”. The output generated by this command was sent to the file nohup.out, which was used to monitor the process.

In order to replace the jar file or build file, we had to make sure to kill the previous processes first. This was done by using the commands “ps -ef | grep java” and 
“sudo kill -9 <PID>”.
