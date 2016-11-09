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

#### Jenkins Job Creation Steps


1. Create a new job. Give it a name. Choose Freestyle Project.
2. For configuration of Job
   Source Code Management-> select Git under Source Code Management-> Enter your project's Git Repository URL.
3. Under Build Environment-> select "Provide Node & npm bin/ folder to PATH"-> choose the NodeJS installation.
4. Additionally, you can also setup multiple branches for the same job.
5. Click Save.
5. Test run a build - Go to Jobs and click "Build Now". 


#### The ability to deploy software to the production environment triggered after build, testing, and analysis stage is completed. The deployment needs to occur on actual remote machine/VM (e.g. AWS, droplet, VCL), and not a local VM.
   
![Screencast](https://github.com/shivamgulati1991/DevOps-Milestone3/blob/master/Screens/1.gif)


#### The ability to configure a production environment automatically, including all infrastructure components, such web server, app service, load balancers, and redis stores. Configure should be accopmlished by using a configuration management tool, such as ansible, or docker. Alternatively, a cluster management approach could also work (e.g., kubernates).
   
![Screencast](https://github.com/shivamgulati1991/DevOps-Milestone3/blob/master/Screens/1.gif)

#### The ability to monitor the deployed application (using at least 2 metrics) and send alerts using email or SMS (e.g., smtp, mandrill, twilio). An alert can be sent based on some predefined rule.  
We are using Twilio service to send the SMS when an alert is raised. Twilio has extended their API for Node.js such that
we could oncorporate it in our application. We are monotoring CPU usage and triggering an alert as soon as the 
monotoring code detects a spike in the CPU usage value above 60%. As a second metric, we are also keeping track of the 
memory usage. We are triggering the alert on a threshold of 90% memory usage.
   
![Screencast](https://github.com/shivamgulati1991/DevOps-Milestone3/blob/master/Screens/1.gif)

#### The ability to autoscale individual components of production and maintain and track in a central discovery service. Autoscale can be triggered by a predefined rule.
   
![Screencast](https://github.com/shivamgulati1991/DevOps-Milestone3/blob/master/Screens/1.gif)

#### The ability to use feature flags, serviced by a global redis store, to toggle functionality of a deployed feature in production.
   
![Screencast](https://github.com/shivamgulati1991/DevOps-Milestone3/blob/master/Screens/1.gif)

#### The ability to perform a canary release: Using a proxy/load balancer server, route a percentage of traffic to a newly staged version of software and remaining traffic to a stable version of software. Stop routing traffic to canary if alert is raised.
   
![Screencast](https://github.com/shivamgulati1991/DevOps-Milestone3/blob/master/Screens/1.gif)


Sources:

1. https://wiki.jenkins-ci.org/display/JENKINS/Installing+Jenkins
2. https://github.com/Grantismo/climbing-grade.js
3. https://github.com/CSC-DevOps/Queues
4. https://github.com/CSC-DevOps/Deployment
5. https://code.tutsplus.com/tutorials/setting-up-continuous-integration-continuous-deployment-with-jenkins--cms-21511
