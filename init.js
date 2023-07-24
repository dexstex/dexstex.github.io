// values to change for the height of the activities rectangle
// remember to update ul li for spotifystart/end
var originalh = -0.2;
var addedh = 5;

// change userId to your user ID
var userid = "545719664983015434";

// different from updatepresence, adds the username, pfp, status, original activities
async function init(data) {
    let json = data;
    // the 4 discord status
    let jsonact = document.getElementById("avatar");
    if (json['discord_status'] === "online") {
        jsonact.classList.add("online")
    } else if (json['discord_status'] === "idle") {
        jsonact.classList.add("idle")
    } else if (json['discord_status'] === "dnd") {
        jsonact.classList.add("dnd")
    } else {
        jsonact.classList.add("offline")
    }
    jsonact.src = "https://cdn.discordapp.com/avatars/" + "545719664983015434" + "/" + json.discord_user['avatar'];
    document.getElementById("name").innerHTML = json.discord_user['username'];
    let activities = json.activities;
    let currentdiv = document.getElementById("activities");
    var h = originalh;
    let curractiv = 1;
    activities.forEach(element => {
        // if not the status activity, continue
        // this is where the code and spotify div are made

        if(element['type'] !== 4) {
            var div = document.createElement("div");
            div.id = element['name'].split(' ').join('').toLowerCase();
            div.className = "activity";
            if(element['name'] === "Spotify") {
                
                var spotifystart = json.spotify.timestamps['start'];
                var spotifyend = json.spotify.timestamps['end'];

                // calculates time elasped, takes current time and minus the starting time
                exp_time = Math.floor(Date.now() / 1000)
                sdiff = (exp_time * 1000) - spotifystart
                // calculates end time, takes end time and minus the starting time
                ediff = spotifyend - spotifystart
                formatTime = (ms) => {
                    var eseconds = Math.floor((ms / 1000) % 60);
                    var eminutes = Math.floor((ms / 1000 / 60) % 60);
                    return [eminutes, eseconds].map(v => String(v).padStart(2,0)).join(':');
                }
                
                // calculates the percentage the song has elasped
                var percentage = Math.round((sdiff / ediff) * 100);


                var songinfo = [json.spotify['song'], json.spotify['artist'].split('; ').join(', ')]
                var songtime = [formatTime(sdiff), formatTime(ediff)]
                div.innerHTML = ('<img draggable="false" alt="" width="64" height="64" src="' + json.spotify['album_art_url'] + '"> ' +
                "<strong>" + element['name'] + "</strong>" + '<ul id="songinfo"><li class="songinfoli">' + songinfo.join('</li><li class="songinfoli">') + '</li></ul>' +
                // progress
                '<div class="progressbar">' + '<div class="progress" style="width:' + percentage + '%;"></div>' + '</div>');
            } else {
                // time elapsed timer
                const current_time = element.timestamps['start'],
                exp_time = Math.floor(Date.now() / 1000)
                diff = (exp_time * 1000) - current_time,
                formatTime = (ms) => {
                    const seconds = Math.floor((ms / 1000) % 60);
                    const minutes = Math.floor((ms / 1000 / 60) % 60);
                    const hours = Math.floor((ms / 1000 / 3600) % 60);
                    return [hours, minutes, seconds].map(v => String(v).padStart(2,0)).join(':');
                }
                var activityinfo = ["<strong>" + element['name'] + "</strong>", "<p>" + (element['details'] === undefined ? "<br>" : element['details']) + "</p>", "<p>" + (element['state'] === undefined ? formatTime(diff) + " elapsed" : element['state']) + "</p>"]
                if(element.assets !== undefined) {
                    if (element.assets['large_image'].startsWith("mp:external/")) {
                        div.innerHTML = ('<img draggable="false" alt="activity icon" class="act-icon" src="https://media.discordapp.net/external/' 
                                        + element.assets['large_image'].replace("mp:external/", "") + '"> <div class="other">' + '<ul><li class="act">' 
                                        + activityinfo.join('</li><li class="act">') + "</li></ul>" + '</div>');
                    }
                    else {}
                } else if(element.assets === undefined) {
                    div.innerHTML = ('<img draggable="false" alt="" width="64" height="64" src="unknown.png"> <div class="other">' +
                        "<ul><li>" + activityinfo.join("</li><li>") + "</li></ul>" + '</div>');
                }
            }

            h += addedh;

            currentdiv.appendChild(div);
        } else {
            // if it is the status, set the src of the emoji img and the status text itself
            var statustext = document.getElementById("status");
            var statusemoji = document.getElementById("statusemoji");

            if (element['state'] == undefined) {} else {
                statustext.innerHTML = element['state'];
            }

            if (element.emoji['name'] !== null) {
                statusemoji.innerHTML = element.emoji['name'];
            } else if (element.emoji['id'] !== null) {
                statusemoji.innerHTML = ['<img draggable="false" alt="" width="24" height="24" src="https://cdn.discordapp.com/emojis/' + element.emoji['id'] + (element.emoji['animated'] ? ".gif" : ".png") + '</img>']
            } else {};
        };
    });

    // set height of activities rect
    currentdiv.style.height = h + "rem";
}

async function updatepresence() {
    var json = await lanyard({userId: userid});
    let activities = json.activities;
    let currentdiv = document.getElementById("activities");
    var h = originalh;
    activities.forEach(element => {
        // if not the status activity, continue
        if(element['type'] !== 4) {
            var activityname = element['name'].split(' ').join('').toLowerCase();
            var exists = true;
            if(document.getElementById(activityname) !== null)
                exists = document.getElementById(activityname)['length'] == 0;
            let div = document.getElementById(activityname);

            // check if the activity already exists, if it does just modify the existing one to not create multiple instances
            if(exists) {
                div = document.createElement("div");
                div.id = activityname;
                div.className = "activity";
            }
            
            // if the activity is spotify try to get all of the song info
            if(element['name'] === "Spotify") {
                
                var spotifystart = json.spotify.timestamps['start'];
                var spotifyend = json.spotify.timestamps['end'];

                // calculates time elasped, takes current time and minus the starting time
                exp_time = Math.floor(Date.now() / 1000)
                sdiff = (exp_time * 1000) - spotifystart

                // calculates end time, takes end time and minus the starting time
                ediff = spotifyend - spotifystart
                formatTime = (ms) => {
                    var eseconds = Math.floor((ms / 1000) % 60);
                    var eminutes = Math.floor((ms / 1000 / 60) % 60);
                    return [eminutes, eseconds].map(v => String(v).padStart(2,0)).join(':');
                }

                var percentage = Math.round((sdiff / ediff) * 100);

                var songinfo = [json.spotify['song'], json.spotify['artist'].split('; ').join(', '), formatTime(sdiff), formatTime(ediff)]
                div.innerHTML = ('<img draggable="false" alt="" width="64" height="64" src="' + json.spotify['album_art_url'] + '"> ' +
                "<strong>" + element['name'] + "</strong>" + "<ul><li>" + songinfo.join("</li><li>") + "</li></ul>" +
                // progress
                '<div class="progressbar">' + '<div class="progress" style="width:' + percentage + '%;"></div>' + '</div>'
                );
            } else {
                // time elapsed timer
                const current_time = element.timestamps['start'],
                exp_time = Math.floor(Date.now() / 1000)
                diff = (exp_time * 1000) - current_time,
                formatTime = (ms) => {
                    const seconds = Math.floor((ms / 1000) % 60);
                    const minutes = Math.floor((ms / 1000 / 60) % 60);
                    const hours = Math.floor((ms / 1000 / 3600) % 60);
                    return [hours, minutes, seconds].map(v => String(v).padStart(2,0)).join(':');
                }

                var activityinfo = ["<strong>" + element['name'] + "</strong>", "<p>" + (element['details'] === undefined ? "<br>" : element['details']) + "</p>", "<p>" + (element['state'] === undefined ? formatTime(diff) + " elapsed" : element['state']) + "</p>"]
                if(element.assets !== undefined) {
                    if (element.assets['large_image'].startsWith("mp:external/")) {
                        div.innerHTML = ('<img draggable="false" alt="activity icon" class="act-icon" src="https://media.discordapp.net/external/' 
                                        + element.assets['large_image'].replace("mp:external/", "") + '"> <div class="other">' + '<ul><li class="act">' 
                                        + activityinfo.join('</li><li class="act">') + "</li></ul>" + '</div>');
                    }
                    else {}
                } else if(element.assets === undefined) {
                    div.innerHTML = ('<img draggable="false" alt="" width="64" height="64" src="unknown.png"> <div class="other">' +
                        "<ul><li>" + activityinfo.join("</li><li>") + "</li></ul>" + '</div>');
                }
            }
            h += addedh;


            if(exists)
                currentdiv.appendChild(div);
        }
    });

    // get the difference of the current activities and the last, mostly just to remove activities that aren't active anymore
    let names = [];
    activities.forEach(e => {if(e['type'] !== 4)names.push(e['name'].split(' ').join('').toLowerCase())})
    var children = [].slice.call(currentdiv.getElementsByClassName('activity'), 0);
    var childnames = new Array(children.length);
    var array1Length = children.length;
    var array2Length = names.length;
    for (var i = 0; i < array1Length; i++) {
        var name = children[i].getAttribute("id");    
        childnames[i] = name;
    }
    var toremove = childnames.filter(x => !names.includes(x));
    children.filter(x => toremove.includes(x.id)).forEach(e => {e.remove()});

    // set height of activities rect
    currentdiv.style.height = h + "rem";
}

const onload = async () => {
    // init all of the original divs and main user details
    const start = async () => {
        var json = await lanyard({userId: userid});
        init(json);
    }

    start();
    
    // start the websocket to automatically fetch the new details on presence update
    lanyard({
        userId: userid,
        socket: true,
        onPresenceUpdate: updatepresence
    })
}
