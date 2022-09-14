<!-- @format -->
<a name="readme-top"></a>

<!-- HEADER -->
<div align="center">
  
  <!-- PROJECT SHIELDS -->
  [![Language Count][language-count-shield]][language-count-url]
  [![Contributors][contributors-shield]][contributors-url]
  [![Forks][forks-shield]][forks-url]
  [![Stargazers][stars-shield]][stars-url]
  [![Issues][issues-shield]][issues-url]
  [![MIT License][license-shield]][license-url]
  
  </br>
    
  <!-- PPOJECT TITLE -->
  <h1 align="center">Eve Projects</h1>
  
  </br>
  
  <!-- PROJECT SUBTITLE -->
  <h3 align="center">
    These scripts are for Google Sheets to interface with Fuzworks API.
    </br>
    Free to use as you want as long as credit is given when due.
  </h3>
  
  <!-- PROJECT LINKS -->
  <p align="center">
    <strong>
      <a href="https://github.com/PhobiaCide/EveProjects">📚 Explore the docs </a>
      ·
      <a href="https://github.com/PhobiaCide/EveProjects/issues">🐛 Report Bug or Suggest Feature</a>
    </strong>
  </p>
</div>
</br>

<!-- TABLE OF CONTENTS -->
<details>
  <summary> <h2>📇Table of Contents</h2></summary>
  <ol>
    <li><h3>
      <a href="#-%E2%84%B9%EF%B8%8F-about-this-project">ℹ️About This Project</a></h3>
      <ul>
        <li><h4><a href="#-built-with-----------">🚧 Built With</a></h4></li>
        <li><h4><a href="#-screenshot-1">📸 Screenshot</a></h4></li>      
      </ul>
    </li>
    <li><h3>
      <a href="#-getting-started">🚼 Getting Started</a></h3>
      <ul>
        <li><h4><a href="#-prerequisites-1">🔰 Prerequisites</a></h4></li>
        <li><h4><a href="#-installation-1">📦 Installation</a></h4></li>
      </ul>
    </li>
    <li><h3><a href="#-usage-1">💼 Usage</a></h3></li>
    <li><h3><a href="#-roadmap-1">📝 Roadmap</a></h3></li>
    <li><h3><a href="#-contributing-1">👍 Contributing</a></h3></li>
    <ul>
      <li><h4><a href="#-how-to-contribute-1">❔ How To Contribute</a></h4></li>
    </ul>
    <li><h3><a href="#-contact-1">⭐ Contact</a></h3></li>
    <li><h3><a href="#-acknowledgments-1">👏 Acknowledgments</a></h3></li>
    <li><h3><a href="#-license-1">📜 License</a></h3></li>  
  </ol>
</details>

</br>
</br>
<hr>
</br>

<!-- ABOUT THE PROJECT -->
<a name="about"></a>
<h2> ℹ️ About This Project</h2>

</br>

<!-- Built With -->
<h3>🚧 Built With: 
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" alt="html5" width="48" height="48" />
  ·
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" alt="css3" width="48" height="48" />
  ·
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" alt="javascript" width="48" height="48" />
</h3>
</br>


- I made this page to gain a better understanding of: 
  1. _Document Flow_ 
  2. _DOM Manipulation_
  3. _The Relationship Between Languages Used_:

</br>

- This is the first Website I've made in years. No one asked me to do it. I just thought my Eve Online alliance would be a suitable subject for this project.

</br>

- I'm learning, practicing and improving my skills as a programmer/web designer.

</br>

<!-- SCREENSHOT -->
<h3>📸 Screenshot</h3>
<div align="left">
  <details>
    <summary>
      <a name="screenshot"></a>
      <h4>Click For Full Page View</h4>
      <img src="./init_screenshot.png" alt="Initail Load Screenshot Of The Deployment">
    </summary>
    <img src="./full_page.png" alt="Full Page Screenshot Of The Deployment">
  </details>
</div>



</br>
</br>
</br>

<p align="right">🔗(<a href="#readme-top">back to top</a>)</p>

<hr>
</br>

<!-- GETTING STARTED -->
<h2>🚼 Getting Started</h2>

</br>

👥 Just clone the repository to get started editing a copy of this project... 

</br>

<p align="center">
  ...👌 Easy peasy.
</p>

</br>

<!-- Prerequisites -->
<h3>🔰 Prerequisites</h3>

</br>

 ⚠️ _At least a basic understanding of html/css would be required to do anything useful with this project._
 
</br>

<!-- Installation -->
<h3>📦 Installation</h3>

</br>

- _Standard html5 Dependencies_.
- _Should work in any modern browser(untested)_.
- _Simply clone the repo and open the files in your favorite text editor_.

</br>

1. Clone the repo
   ```sh
   git clone https://github.com/PhobiaCide/pewgilism..git
   ```
</br>

2. Install NPM packages
   ```sh
   npm install
   ```
   
</br>
</br>
</br>

<p align="right">🔗(<a href="#readme-top">back to top</a>)</p>

<hr>
</br>

<!-- USAGE -->
<h2>💼 Usage</h2>
</br>
<h3> Eve SDE Importer</h3>

[Fuzworks](https://www.fuzzwork.co.uk/2021/07/17/understanding-the-eve-online-sde-1/) has a system that converts the Eve SDE package into useable formats.
This script downloads CSV formats and updates SDE Tables used in Google Sheets making this script a good companion with GESI.

To use Copy EveSdeImport.js to the Google Sheet Script editor (or Clasp for local editing).
Then its just a matter of setting up the configuration.

</br>
<details>
  <summary>
    Sample add menu option
  </summary>
  
```js
function onOpen() {
  var ui = SpreadsheetApp.getUi();
  // Or DocumentApp or FormApp.
  ui.createMenu("Sheet Tools")
    .addItem("Update SDE Data", "importSDE")
    .addToUi();
}
```
  
</details>
</br>
<details>
  <summary>
    importSDE() function
  </summary>
  
```js
function importSDE() {
  // Display an alert box with a title, message, input field, and "Yes" and "No" buttons. The
  // user can also close the dialog by clicking the close button in its title bar.
  var ui = SpreadsheetApp.getUi();

  var response = ui.alert(
    "Updating the SDE",
    "Updating the SDE may take several minutes. In the meantime do not close the window otherwise you will have to restart. Continue?",
    ui.ButtonSet.YES_NO
  );

  // Process the user's response.
  if (response == ui.Button.YES) {
    SpreadsheetApp.flush();
    const sdePages = [
      /**   new SdePage(
          "SDE_sample",
          "sample.csv",
          [ "sample headers", "These are not required",]
          ),
          */
      new SdePage(
        "SDE_invTypes",
        "invTypes.csv",
        /** Optional headers,
         * invTypes is 100+ megabytes. Select Columns needed to help it laod faster.
         */
        ["typeID", "groupID", "typeName", "mass", "volume"]
      ), //,
    ];
    sdePages.forEach((page) => buildSDEs(page));
  } else if (response == ui.Button.NO) {
    ui.alert("SDE unchanged.");
  } else {
    ui.alert("SDE unchanged.");
  }
}
```

</details>

</br>
</br>

<p align="right">🔗(<a href="#readme-top">back to top</a>)</p>

<hr>
</br>

<!-- ROADMAP -->
<h2>📝 Roadmap</h2>

</br>

- [x] Add README.md
  - [ ] Add Emojis
  - [ ] Refine README.md
  - [ ] Finish README.md
- [x] Add LICENSE.txt
- [ ] Set Up Issues
- [ ] List All Issues
- [ ] Fix All Issues
- [ ] Finish Site

</br>

⚠️ _See_ [open issues](https://github.com/PhobiaCide/pewgilism./issues) _for a full list of proposed features (and known issues)_.

</br>
</br>
</br>

<p align="right">🔗(<a href="#readme-top">back to top</a>)</p>

<hr>
</br>

<!-- CONTRIBUTING -->
<h2>👍 Contributing</h2>

</br>

💪 _Contributions are what make the open source community such an amazing place to learn, inspire, and create_... 

👼 _Any contributions you make are **greatly appreciated**_...

💭 _If you have a suggestion that would make this better, please fork the repo and create a pull request_... 

💬 _You can also simply open an issue with the tag "enhancement"_...

⭐ _Don't forget to give the project a star! Thanks again_!

</br>

<!-- HOW TO CONTRIBUTE -->
<h3>❔ How To Contribute</h3>

</br>

1. 🍴 Fork the Project
3. 🎨 Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
4. 💾 Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
5. 📌 Push to the Branch (`git push origin feature/AmazingFeature`)
6. 📂 Open a Pull Request

</br>
</br>
</br>

<p align="right">🔗(<a href="#readme-top">back to top</a>)</p>

<hr>
</br>

<!-- CONTACT -->
<h2>🌟 Contact</h2>

</br>

- 📧 email: aamason86@gmail.com

- :octocat: GitHub Profile: [PhobiaCide](https://github.com/PhobiaCide)

</br>
</br>
</br>

<p align="right">🔗(<a href="#readme-top">back to top</a>)</p>

<hr>
</br>

<!-- ACKNOWLEDGMENTS -->
<h2>👏 Acknowledgments</h2>

</br>

- [GitHub Emoji Cheat Sheet](https://www.webpagefx.com/tools/emoji-cheat-sheet)
- [Img Shields](https://shields.io)


</br>
</br>
</br>

<p align="right">🔗(<a href="#readme-top">back to top</a>)</p>

<hr>
</br> 

<!-- LICENSE -->
<h2>📜 License</h2>

</br>

<div align="center">
Distributed under the <strong>CC0 1.0 Universal</strong>. See `LICENSE.txt` for more information.
</br>
</br>
<strong>Copyright ©️ 2022 </strong>
</div>

</br>
</br>
</br>

<p align="right">🔗(<a href="#readme-top">back to top</a>)</p>

<hr>
</br>
<!-- MARKDOWN LINKS & IMAGES -->

[language-count-shield]: https://img.shields.io/github/languages/count/PhobiaCide/EveProjects?style=for-the-badge
[language-count-url]: https://img.shields.io/github/languages/count/PhobiaCide/EveProjects
[contributors-shield]: https://img.shields.io/github/contributors/PhobiaCide/EveProjects?style=for-the-badge
[contributors-url]: https://github.com/PhobiaCide/EveProjects
[forks-shield]: https://img.shields.io/github/forks/PhobiaCide/EveProjects?style=for-the-badge
[forks-url]: https://github.com/PhobiaCide/EveProjects
[stars-shield]: https://img.shields.io/github/stars/PhobiaCide/EveProjects?style=for-the-badge
[stars-url]: https://github.com/PhobiaCide/EveProjects/stargazers
[issues-shield]: https://img.shields.io/github/issues/PhobiaCide/EveProjects?style=for-the-badge
[issues-url]: https://github.com/PhobiaCide/EveProjects/issues
[license-shield]: https://img.shields.io/github/license/PhobiaCide/EveProjects?style=for-the-badge
[license-url]: https://github.com/PhobiaCide/EveProjects/LICENSE.txt
[product-screenshot]: images/screenshot.png


# EveProjects

These scripts are for Google Sheets to interface with Fuzworks API

Free to use as you want as long as credit is given when due.

# Eve SDE Importer

[Fuzworks](https://www.fuzzwork.co.uk/2021/07/17/understanding-the-eve-online-sde-1/) has a system that converts the Eve SDE package into useable formats.
This script downloads CSV formats and updates SDE Tables used in Google Sheets making this script a good companion with GESI.

To use Copy EveSdeImport.js to the Google Sheet Script editor (or Clasp for local editing).
Then its just a matter of setting up the configuration.


# GESI wrappers

This will enable existing google sheets with Eve Authorized characters to work.
They're not in tended for New Sheets or Adding new characters to the sheet GESI installer isn't working properly.

To get your sheet operational, Copy the code from GESI.wrappers.js to a .js file in your Script editor.

Verify that the GESI Library is installed as a Script Editor Library. Follow the GESI Documentation below:

### Script Editor (taken from Blacksmoke's Documentation)

By default, one does not have access to GESI functions for use in custom functions in the script editor. In order to gain access to these functions for custom logic, add GESI as a library to your script:

1. Install the add-on, follow the [setup instructions](#setup).
1. Within the script editor, click the `+` icon next to the `Libraries` heading.
1. Paste in `1KjnRVVFr2KiHH55sqBfHcZ-yXweJ7iv89V99ubaLy4A7B_YH8rB5u0s3` into the `Script ID` box and click `Look up`.
1. Select the most recent version that is _NOT_ `HEAD`, and click `Add`.

In order to use this, functions must be perpended with `GESI`, which maps to the `Identifier` field in the Libraries modal. For example, `GESI.universe_types();`

**NOTE:** Libraries _do not_ update on their own. When a new version of GESI is released, click on `GESI` under the `Libraries` heading and select the most recent version that is _NOT_ `HEAD`.
