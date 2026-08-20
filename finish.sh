#!/bin/bash
cd "$(dirname "$0")" || exit 1
mkdir -p assets/img
B="https://static.wixstatic.com/media"
dl(){ curl -sL -A "Mozilla/5.0" "$1" -o "$2" && echo "  got $2"; }
echo "Downloading images from your live site..."
dl "$B/38906d_2d43462e75ad49ac91c2cda58d3b7b8f~mv2.png" assets/img/logo.png
dl "$B/11062b_8b9e1da11da84f529e4294c36e352760~mv2.jpg" assets/img/hero-lakeside.jpg
dl "$B/38906d_f088d62892f84c13ad9e75ad448d5512~mv2.jpg" assets/img/wfg-logo.jpg
dl "$B/4bc58c57d0e344dd8fafababb89d6848.jpg"           assets/img/services-1.jpg
dl "$B/38906d_cfad96d6ba1b4dff8e451c964705f3d2~mv2.jpg" assets/img/services-2.jpg
dl "$B/38906d_e5b3aea34aae4d93b5b921743fde3c30~mv2.png" assets/img/services-3.png
dl "$B/38906d_e33374b86f4c496bafdd3428739ac006~mv2.jpg" assets/img/services-4.jpg
dl "$B/11062b_a263f5ae601747f58337e307d6fba42e~mv2.jpg" assets/img/homeowners-1.jpg
dl "$B/20d96b8914684d518f06a78461f89cca.jpg"           assets/img/homeowners-2.jpg
dl "$B/38906d_a302030c221649c1ba9649da36d9611e~mv2.png" assets/img/desk.png
echo "Optimizing (macOS sips)..."
sips -s format jpeg assets/img/services-3.png --out assets/img/services-3.jpg >/dev/null 2>&1 && rm -f assets/img/services-3.png
sips -s format jpeg assets/img/desk.png       --out assets/img/desk.jpg       >/dev/null 2>&1 && rm -f assets/img/desk.png
sips -Z 64  assets/img/logo.png --out assets/img/favicon.png >/dev/null 2>&1
for f in hero-lakeside services-1 services-2 services-3 services-4 homeowners-1 homeowners-2 desk; do sips -Z 2000 "assets/img/$f.jpg" >/dev/null 2>&1; done
sips -Z 900 assets/img/wfg-logo.jpg >/dev/null 2>&1
echo "Committing & pushing..."
if [ ! -d .git ]; then git init -q; git branch -M main; git remote add origin https://github.com/AaronPilk/Legacy-Title-.git; fi
git config user.name "AaronPilk" >/dev/null 2>&1
git config user.email "aaron@skyway.media" >/dev/null 2>&1
git add -A
git -c commit.gpgsign=false commit -m "Rebuild Legacy Group Title site (modern, floating cards)" >/dev/null 2>&1
git push -u origin main && echo "" && echo "DONE - pushed to https://github.com/AaronPilk/Legacy-Title-"
