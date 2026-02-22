## spec

#### revisionHistoryLimit
tells Kubernetes to keep the configs of the previous 5 releases. for rollout.

#### progressDeadlineSeconds
The maximum time Kubernetes waits for a rollout to make progress before marking it as failed.

#### minReadySeconds
How long a Pod must stay Ready before it is considered available.

### Strategy
#### maxUnavailable
Never have more than one Pod below desired state (maxUnavailable: 1)
#### maxSurge
Never have more than one Pod above desired state (maxSurge: 1)

##### Desc:
As the desired state of the app requests 10 replicas, maxSurge: 1 means you’ll never have more than 11 replicas
during the update process, and maxUnavailable: 1 means you’ll never have less than 9. The net result is a rollout
that updates two Pods at a time (the delta between 9 and 11 is 2).

### CLI
#### deployment
---> ```kubectl apply -f deploy.yml --record```

#### monitor the progress with kubectl rollout status.
---> ```kubectl rollout status deployment hello-deploy```
#### kubectl get deploy
---> ```kubectl get deploy``

#### Deployment reversions
---> ```kubectl rollout history deployment hello-deploy```

#### revert the application to revision 1.
---> ``` kubectl rollout undo deployment hello-deploy --to-revision=1```