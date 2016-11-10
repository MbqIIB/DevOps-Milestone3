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
As a service provider, we have used Digital Ocean and we set up droplets for following:

1. Droplet which has Jenkins build server, Redis cache ....
2. Droplet which acts as a stable production server
3. Canary.....

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
3. Login to github.com and your project repository. From settings, set GitHub web hook URL as below.
```

```

4. Setups keys
5. In the execute build section of Jenkins job, write the below shell script further to deploy the successful changes to the production server.

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
   
![Screencast](https://github.com/shivamgulati1991/DevOps-Milestone3/blob/master/Screens/1.gif)

#### The ability to monitor the deployed application (using at least 2 metrics) and send alerts using email or SMS (e.g., smtp, mandrill, twilio). An alert can be sent based on some predefined rule.  

We are using Twilio service to send the SMS when an alert is raised. Twilio's Node.js has been incorporate in our application. 
For the metrics, we chose the below two criteria:

1. CPU usage - Alert would be triggered when the code detects a spike in CPU usage above 60%
2. High memory usage -  Alert would be triggered on high memory usage exceeding a predefined threshold of 90%.
   
![Screencast](https://github.com/shivamgulati1991/DevOps-Milestone3/blob/master/Screens/3_1.gif)
![Screenshot](https://github.com/shivamgulati1991/DevOps-Milestone3/blob/master/Screens/3_2.jpeg =250x)

#### The ability to autoscale individual components of production and maintain and track in a central discovery service. Autoscale can be triggered by a predefined rule.
   
![Screencast](https://github.com/shivamgulati1991/DevOps-Milestone3/blob/master/Screens/1.gif)

#### The ability to use feature flags, serviced by a global redis store, to toggle functionality of a deployed feature in production.
   
![Screencast](https://github.com/shivamgulati1991/DevOps-Milestone3/blob/master/Screens/1.gif)

#### The ability to perform a canary release: Using a proxy/load balancer server, route a percentage of traffic to a newly staged version of software and remaining traffic to a stable version of software. Stop routing traffic to canary if alert is raised.
   
![Screencast](https://github.com/shivamgulati1991/DevOps-Milestone3/blob/master/Screens/6_1.gif)
![Screencast](https://github.com/shivamgulati1991/DevOps-Milestone3/blob/master/Screens/6_2.gif)


Sources:

1. https://wiki.jenkins-ci.org/display/JENKINS/Installing+Jenkins
2. https://github.com/Grantismo/climbing-grade.js
3. https://github.com/CSC-DevOps/Queues
4. https://github.com/CSC-DevOps/Deployment
5. https://code.tutsplus.com/tutorials/setting-up-continuous-integration-continuous-deployment-with-jenkins--cms-21511
