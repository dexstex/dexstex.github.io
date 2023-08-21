var userid = "545719664983015434";
async function init(i) {
  let e = i,
    t = document.getElementById("istatusdot");
  c = document.getElementById("istatustext");
  if ("online" === e.discord_status) {
    t.classList.add("online");
    c.innerHTML = "Currently Online";
  } else if ("idle" === e.discord_status) {
    t.classList.add("idle");
    c.innerHTML = "Currently Idle";
  } else if ("dnd" === e.discord_status) {
    t.classList.add("dnd");
    c.innerHTML = "Currently on Do Not Disturb";
  } else {
    t.classList.add("offline");
    c.innerHTML = "Currently Dead";
  }
}

const onload = async () => {
  init(await lanyard({ userId: userid }));
};
