if [ "$ver" == "" ]; then
ver=1.0.0
fi

echo "docker build -t \"scholtz2/biatec-learn:$ver-main\" -f Dockerfile .."
nice -n 20 docker build -t "scholtz2/biatec-learn:$ver-main" -f Dockerfile .. || error_code=$?
if [ "$error_code" != "" ]; then
echo "$error_code";
    echo "failed to build";
	exit 1;
fi

docker push "scholtz2/biatec-learn:$ver-main" || error_code=$?
if [ "$error_code" != "" ]; then
echo "$error_code";
    echo "failed to push";
	exit 1;
fi

echo "Image: scholtz2/biatec-learn:$ver-main"