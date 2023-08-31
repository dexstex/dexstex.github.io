var userid = "545719664983015434";
async function init(i) {
  let e = i,
    t = document.getElementById("istatusdot");
    c = document.getElementById("istatustext");
    d = e.discord_status;
  if ("online" === d) {
    t.classList.add("online");
    c.innerHTML = "Currently Online";
  } else if ("idle" === d) {
    t.classList.add("idle");
    c.innerHTML = "Currently Idle";
  } else if ("dnd" === d) {
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
