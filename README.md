# Milestone3 - Deployment

Team Members:

1. Ayush Gupta - agupta25@ncsu.edu
2. Nishtha Garg - ngarg@ncsu.edu
3. Shivam Gulati - sgulati2@ncsu.edu

We have used Jenkins to configure the build server. Alongwith Jenkins, we have used Tomcat, Git for Source Code Management and NPM as a package manager.

Additions tools used: ???

We used the MIT licensed Climbing-Grade project which is forked at 
```
https://github.com/shivamgulati1991/climbing-grade
```
As a service provider, we have used Digital Ocean and set up droplets for following:

1. Droplet which has Jenkins build server and other infrastructure configrations
2. Droplet which acts as a stable production server
3. Droplet which acts as canary server

#### Jenkins Job Creation Steps

1. Create a new job. Give it a name. Choose Freestyle Project.
2. For configuration of Job
   Source Code Management-> select Git under Source Code Management-> Enter your project's Git Repository URL.
3. Under Build Environment-> select "Provide Node & npm bin/ folder to PATH"-> choose the NodeJS installation.
4. Additionally, you can also setup multiple branches for the same job.
5. Click Save.
5. Test run a build - Go to Jobs and click "Build Now". 


#### The ability to deploy software to the production environment triggered after build, testing, and analysis stage is completed. The deployment needs to occur on actual remote machine/VM (e.g. AWS, droplet, VCL), and not a local VM.

We used Digital Ocean droplets for this task. Droplet 1 maintains the Jenkins build server and droplet 2 has the production environment.

1. Create a Jenkins job for this task.
2. Build, test and analysis is performed as same as done in Milestone 2.
3. Login to github.com and your project repository. From settings, go to Integration and Services.
4. Click on Add Service and select Jenkins (GitHub plugin).
5. Add the URL for the jenkins box in the URL box
```
http://<Droplet IP>/github-webhook/
```

4. For the keys, add the public ssh key of the droplet to authorized_keys of the stable production Server. This allows Jenkins to ssh into the server and deploy the new code after build.
5. In the execute build section of Jenkins job, write the below shell script further to deploy the successful changes to the production server. You can also write this as a script and call the script in the action.
```
ssh root@<IP address> <<EOF
  cd ~/m3base
  git pull
  npm install --production
  forever restartall
  exit
EOF
```

6. This would complete the build and if successful, deploy the code on stable production server.

![Screencast](https://github.com/shivamgulati1991/DevOps-Milestone3/blob/master/Screens/1.gif)


#### The ability to configure a production environment automatically, including all infrastructure components, such web server, app service, load balancers, and redis stores. Configure should be accopmlished by using a configuration management tool, such as ansible, or docker. Alternatively, a cluster management approach could also work (e.g., kubernates).

For this we used the learning from homeworks and workshops, and setup the environment automatically using script to create Digital Ocean droplet and installing dependencies and requirements using Ansible playbook. The steps we followed:

1. Run the do.js script which creates a Digital Ocean droplet and writes the IP address of the same to the inventory file.
```
node do.js
```

2. It might take a short while for the server to be provisioned.
3. After that is done, run the Ansible command which consumes the inventory file and reads the playbook.yml rules to automatically provision the requirements.

```
ansible-playbook -i inventory playbook.yml
```

4. The playbook sets up all the requirements and provisions them to the server to make it ready as needed. 
   
![Screencast](https://github.com/shivamgulati1991/DevOps-Milestone3/blob/master/Screens/2.gif)

#### The ability to monitor the deployed application (using at least 2 metrics) and send alerts using email or SMS (e.g., smtp, mandrill, twilio). An alert can be sent based on some predefined rule.  

We are using Twilio service to send the SMS when an alert is raised. Twilio's dependency was added to the package.json file. 
For the metrics, we chose the below two criteria:

1. CPU usage - Alert would be triggered when the code detects a spike in CPU usage above 60%
2. High memory usage -  Alert would be triggered on high memory usage exceeding a predefined threshold of 90%.

Our file alert.js monitors the service and sends an alert message on phone as well as a console output.

Screencast for alert message

![Screencast](https://github.com/shivamgulati1991/DevOps-Milestone3/blob/master/Screens/3_1.gif)

Alerts recieved on phone

![Screenshot](https://github.com/shivamgulati1991/DevOps-Milestone3/blob/master/Screens/3_2.jpg)

#### The ability to autoscale individual components of production and maintain and track in a central discovery service. Autoscale can be triggered by a predefined rule.
   
1. We are performing horizonal scaling on the server. 
2. We chose memory usage as the parameter, when it is more than 50%, the server scales by doubling the memory.
3. The same is run from the file alert.js
3. We can track the same and usage in the digital ocean web's dashboard.

![Screencast](https://github.com/shivamgulati1991/DevOps-Milestone3/blob/master/Screens/4.gif)

#### The ability to use feature flags, serviced by a global redis store, to toggle functionality of a deployed feature in production.

We used a redis-key value server as a global store to maintain the feature flag. This feature can be enabled or disabled using the redis-cli.

1. We have toggled the functioning of one of our feature Meow which displays the images or shows 'No images to show'.
2. When the key is set ON this, feature is enabled and would work as above. To turn it ON, type below in redis-cli
```
SET mykey ON
```

mykey is the variable which would either be OFF or ON.

3. When the key is set OFF this, feature is disabled and will display “Sorry! This functionality is disabled right now.”. To turn it OFF, type below in redi-cli
```
SET mykey OFF
```

![Screencast](https://github.com/shivamgulati1991/DevOps-Milestone3/blob/master/Screens/5.gif)

#### The ability to perform a canary release: Using a proxy/load balancer server, route a percentage of traffic to a newly staged version of software and remaining traffic to a stable version of software. Stop routing traffic to canary if alert is raised.

1. We run the main code on a droplet.
```
node <filename.js>
```

2. We start the proxy server which also displays messages how our requests are routed to the production and the other canary server.
```
node proxy.js
```

3. We route the traffic as 67% to stable server and 33% to canary. Simply, every 3rd request is sent the Canary server.
4. We use CPU memory usage to trigger alert and stopping the canary. When the limit exceeds the utlization of 85%, the requests to canary are stopped and all further requests are only sent to production.

Screencast for traffic routing

![Screencast](https://github.com/shivamgulati1991/DevOps-Milestone3/blob/master/Screens/6_1.gif)

Screencast for stopping Canary on alert

![Screencast](https://github.com/shivamgulati1991/DevOps-Milestone3/blob/master/Screens/6_2.gif)


Sources:

1. https://wiki.jenkins-ci.org/display/JENKINS/Installing+Jenkins
2. https://github.com/Grantismo/climbing-grade.js
3. https://github.com/CSC-DevOps/Queues
4. https://github.com/CSC-DevOps/Deployment
5. https://code.tutsplus.com/tutorials/setting-up-continuous-integration-continuous-deployment-with-jenkins--cms-21511
