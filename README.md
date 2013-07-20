# Installation

Installing the necessary components is fairly simple:

1. Clone the repository:

        git clone git@github.com:sproutcore/website.git

1. Clone the git@github.com/sproutcore/sproutcore.github.com.git into the output
directory (this is the live site and what):

        rm -rf output && git clone git@github.com:sproutcore/sproutcore.github.com.git output

1. Install the dependencies (mainly nanoc) so you can preview the SproutCore website:

        bundle install

# Updating the Site

You can preview the site by running `nanoc autocompile` and visiting
[http://localhost:3000/](http://localhost:3000/) in your browser.

The templates for the site are located in `layouts/`. Each content page is
located in `content/`.

To configure navigation tabs, modify the metadata at the top of each page:

    ---
    title: SproutCore - About
    id: about
    h1: About SproutCore
    download: true
    subnav:
    - What is SproutCore
    - Who's Using SproutCore
    - Core Team
    - Logos
    ---

* `title` - the title that is displayed in the browser.
* `id` - determines the active state of the main navigation at the top.
* `h1` - fills in the main title on the page itself
* `download` - indicates whether the download button should be displayed
* `subnav` - a list of panels on the page to navigate through

You can add modal content using a modal helper:

    <% modal "your-modal-id" do %>
      <h1>Modal content here</h1>
    <% end %>

The URL structure has changed slightly. Instead of being located at /community.html,
the page is now located at /community/. Please make sure that all links to images, CSS
and JavaScript are absolute (/js/myjs.js, not js/myjs.js).

# Deploying Changes

_**Note:** Before deploying, please preview the site and make sure that everything looks
correct! Additionally, when you run the `git status` command below, please make sure the
changes are sane._

Deploying your changes is a simple 2 step process:

1. Compile the changes into the output directory:

        nanoc compile

1. Commit and push your changes

        cd output
        git status
        git commit -am "New build."
        git push
