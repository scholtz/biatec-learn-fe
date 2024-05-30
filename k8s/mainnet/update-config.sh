kubectl apply -f deployment-main.yaml -n biatec
kubectl delete configmap biatec-learn-main-conf -n biatec
kubectl create configmap biatec-learn-main-conf --from-file=conf -n biatec
kubectl rollout restart deployment/biatec-learn-main-deployment -n biatec
