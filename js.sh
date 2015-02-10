
MD5=""

while true
do
  sleep 0.2
  N=`md5sum src/timeline.js`

  if [ "$N" != "$MD5" ]; then
    `uglifyjs src/timeline.js -o dist/timeline.min.js`
    MD5=`md5sum src/timeline.js`
    echo "File minified"
  fi
done
