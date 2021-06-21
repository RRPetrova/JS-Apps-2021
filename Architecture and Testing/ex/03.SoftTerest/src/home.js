export function setupHome(section, navig) {
   section.querySelector("a").addEventListener("click", (ev) => {
       ev.preventDefault();
       navig.goTo("dashboard");
   })
   
   
   
    return showHome;

    async function showHome() {
        return section;      
    }
}

