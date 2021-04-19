"use strict";

define([
    "jquery"
], function (
    $
) {

  function create_modal() {
    // CSS for the modal box
    $("head").append(
      $("<style>").html(`
      #plusGitRepoModal {
        position:absolute;
        top: 20%;
        left: 50%;
        transform: translate(-50%,-50%);
        -webkit-transform: translate(-50%,-50%);
        background-color: #fff;
        z-index: 10;
        border: 1px solid grey;
        border-radius: 2px;
      }

      .plusGitRepoModalHidden {
        display:none;
      }

      #plusGitRepoModalFormHeader {
        background-color: #eee;
        padding: 1em;
      }

      #plusGitRepoModalFormBody {
        padding: 20px;
      }

      #plusGitRepoModalFormBody div {
        padding-bottom: 1em;
      }

      #plusGitRepoModalFormBody button {
        margin-left: 5px;
      }

      #plusGitRepoModalForm label {
        padding-right: 1em;
        width: 10em;
        text-align: right;
      }

      #plusGitRepoUrl {
        width 15em;
      }
      #plusGitRepoBranch {
        width: 5em;
      }

      `)
    );
    var modalForm = $("<div>").attr("id", "plusGitRepoModal")
                              .addClass("plusGitRepoModalHidden")
        .append(
          $("<form>").attr("action", "#")
                    .attr("id", "plusGitRepoModalForm")
                    .attr("method", "get")
                    .attr("name", "gitRepoForm")
            .append(
              $("<div>").attr("id", "plusGitRepoModalFormHeader")
                .append(
                  $("<p>")
                  .append(
                      $("<strong>")
                        .text("Enter the details of the Git "
                               + "Repository to clone:")
                    )
                )
            )
            .append(
              $("<div>").attr("id", "plusGitRepoModalFormBody")
              .append(
                $("<p>")
                  .append(
                    $("<label>").attr("for", "plusGitRepoUrl")
                    .text("Git Repository URL: ")
                  )
                  .append(
                    $("<input>").attr("type", "text")
                                .attr("name", "plusGitRepoUrl")
                                .attr("id", "plusGitRepoUrl")
                  )
              )
              .append(
                $("<p>")
                  .append(
                    $("<label>").attr("for", "plusGitRepoBranch")
                    .text("Branch: ")
                  )
                  .append(
                    $("<input>").attr("type", "text")
                                .attr("name", "plusGitRepoBranch")
                                .attr("id", "plusGitRepoBranch")
                                .attr("value", "master")
                  )
              )
              .append(
                $("<p>")
                  .append(
                    $("<label>").attr("for", "plusGitRepoUsername")
                    .text("Username*: ")
                  )
                  .append(
                    $("<input>").attr("type", "text")
                                .attr("name", "plusGitRepoUsername")
                                .attr("id", "plusGitRepoUsername")
                  )
              )
              .append(
                $("<p>")
                  .append(
                    $("<label>").attr("for", "plusGitRepoPassword")
                    .text("Password*: ")
                  )
                  .append(
                    $("<input>").attr("type", "password")
                                .attr("name", "plusGitRepoPassword")
                                .attr("id", "plusGitRepoPassword")
                  )
              )
              .append(
                $("<div>").addClass(["pull-left", ""])
                  .text("* Optional")
              )
              .append(
                $("<div>").addClass(["pull-right", ""])
                .append(
                  $("<button>").attr("type", "submit")
                  .addClass(["nb_tree_buttons", "btn", "btn-default", "btn-xs"])
                  .text("Clone")
                            .on("click", function(e) {
                              var plusGitRepoUrl =
                                $( "input#plusGitRepoUrl" ).val();
                              var plusGitRepoBranch =
                                $( "input#plusGitRepoBranch" ).val();
                              var plusGitRepoUsername = 
                                $( "input#plusGitRepoUsername" ).val();
                              var plusGitRepoPassword =
                                $( "input#plusGitRepoPassword" ).val();
                              if (plusGitRepoUrl && plusGitRepoBranch ) {
                                if (plusGitRepoUrl.indexOf("http") === 0)
                                {
                                  // construct the url that nbgitpuller needs
                                  var thisUrl = window.location.href;
                                  console.log("plusGitRepoUsername:" + plusGitRepoUsername + " && plusGitRepoPassword:" + plusGitRepoPassword)
                                  if (plusGitRepoUsername && plusGitRepoPassword ) {
                                    console.log("plusGitRepoUrl:" + plusGitRepoUrl)
                                    let [protocol, rest] = plusGitRepoUrl.split("://")
                                    console.log("protocol" + protocol + " & rest: " + rest)
                                    plusGitRepoUrl = protocol + "://" + plusGitRepoUsername
                                      + ":" + plusGitRepoPassword  + "@" + rest
                                  }
                                  console.log("plusGitRepoUrl:" + plusGitRepoUrl)
                                  var pullReqUrl = thisUrl.slice(0, thisUrl.indexOf("tree"))
                                      + "git-pull?repo=" + plusGitRepoUrl + "&branch="
                                      + plusGitRepoBranch;
                                  e.preventDefault();
                                  window.location.href = pullReqUrl;
                                }
                              }
                            } )
                )
                .append(
                  $("<button>").attr("type", "submit")
                            .addClass(["nb_tree_buttons", "btn",
                                       "btn-default", "btn-xs"])
                            .text("Cancel")
                            .on("click", function(e) {
                              $("#plusGitRepoModal")
                              .addClass("plusGitRepoModalHidden");
                              e.preventDefault();
                            } )
                )
              )
            )
        ).appendTo($("#notebook_toolbar"));
  }

  function load_ipython_extension() {
    create_modal();
    var button = $("<button/>", {
          title: "Pull down a Git repository", //tooltip
          type: "button",
          id: "btnOpenDialog",
          class: "nb_tree_buttons btn btn-default btn-xs",
          style: "",
          text: "+GitRepo"
      }).on("click", function() {
        $("#plusGitRepoModal").removeClass("plusGitRepoModalHidden");
      }).insertBefore($("#alternate_upload"));
  }

  return {
      load_ipython_extension: load_ipython_extension
  };

});
