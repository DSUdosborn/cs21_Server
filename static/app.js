var serverURL = "https://cs2021tododz.herokuapp.com";

var app = new Vue ({
        el:"#app",
    data:{
        links:[
            {

            },

        ],
        new_link_name: "",
        new_link_description: "",
        new_link_url: "",
        new_link_linkType: "",
        new_link_done: false,
        new_link_expired: "",
        new_link_assigned: "",
        new_link_updated: "",

        },

    created: function(){
      this.getLinks();
    },

    methods:{

        addNewLink: function(){
          var request_body = {
              name: this.new_link_name,
              description: this.new_link_description,
              url: this.new_link_url,
              linkType: this.new_link_linkType,
              done: false,
              expired: this.new_link_expired,
              assigned: this.new_link_assigned,
              updated: this.new_link_updated
          };
            fetch(`${serverURL}/link`,{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify(request_body)
            }).then(function(response){
                if(response.status == 400){
                    response.json().then(function(data){
                        alert(data.msg)
                    })
                }else if(response.status == 201){
                    app.new_link_name="";
                    app.new_link_description="";
                    app.new_link_url="";
                    app.new_link_linkType="";
                    app.new_link_expired="";
                    app.new_link_assigned="";
                    app.new_link_updated="";
                    app.getlinks();
                }
            });

        },

        getLinks: function(){
          fetch(`${serverURL}/link`).then(function(response){
            response.json().then(function(data){
              app.links = data;
            })
          })
        },

        deleteLink: function ( link ) {
             fetch(`${serverURL}/link/` + link._id, {
                 method:"DELETE",
                 headers:{
                     "Content-Type":"application/json"
                 }
             }).then(function(){
                 app.getlinks()})

         },

        editLink: function(link){
          console.log("set link.editing");
            this.$set(link, "editing", true);
        },

        saveLink: function(link){
          var post_body= {
            name: link.name,
            description: link.description,
            url: link.url,
            linkType: link.linkType,
            done: false,
            expired: link.expired,
            assigned: link.assigned,
            updated: link.updated
          };
          fetch(`${serverURL}/link/` + link._id, {
              method:"PUT",
              headers:{
                  "Content-Type":"application/json"
              },
              body:JSON.stringify(post_body)
            });
            this.$set(link, "editing" ,false);

        },

        cancelSave: function(link) {
            link.editing = false;

        },

        saveList: function() {
          localStorage.setItem("LocalTaskList", JSON.stringify(links));
        }

    }
});
