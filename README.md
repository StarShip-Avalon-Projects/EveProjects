<!-- @format -->
<a name="readme-top"></a>

<!-- HEADER -->

<!-- PROJECT SHIELDS -->
<div align="center">
  
  [![Language Count][language-count-shield]][language-count-url]
  [![Contributors][contributors-shield]][contributors-url]
  [![Forks][forks-shield]][forks-url]
  [![Stargazers][stars-shield]][stars-url]
  [![Issues][issues-shield]][issues-url]
  [![MIT License][license-shield]][license-url]

</div>

<!-- PPOJECT TITLE -->
<h1 align="center">
  Eve Projects
</h1>

<!-- PROJECT SUBTITLE -->
<h3 align="center">
  Apps scripts for playing spreadsheets in space out of space
</h3>

<!-- PROJECT LINKS -->
  <p align="center">
    <strong>
      <a href="https://github.com/PhobiaCide/EveProjects">
        📚 Explore the docs 
      </a>
      ·
      <a href="https://github.com/PhobiaCide/EveProjects/issues">
        🐛 Report Bug or Suggest Feature
      </a>
    </strong>
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<nav>
  <details>
    <summary> 
      <h2>
        📇Table of Contents
      </h2>
    </summary>
    <ol>
      <li>
        <h4>
          <a href="#-----%E2%84%B9%EF%B8%8F-about-this-project--">
            ℹ️ About This Project
          </a>
        </h4>
      </li>
      <li>
        <h4>
          <a href="#-----getting-started--">
            🚼 Getting Started
          </a>
        </h4>
        <ul>
          <li>
            <h5>
              <a href="#-----prerequisites--">
                🔰 Prerequisites
              </a>
            </h5>
          </li>
          <li>
            <h5>
              <a href="#-----installation--">
                📦 Installation
              </a>
            </h5>
          </li>
        </ul>
      </li>
      <li>
        <h4>
          <a href="#-----usage--">
            💼 Usage
          </a>
        </h4>
      </li>
      <ul>
        <li>
          <a href="#-----scripts--">
            📃 Scripts
          </a>
        </li>
        <li>
          <a href="#--gesi-wrappers">
            🧮 GESI Wrappers
          </a>
        </li>
      </ul>
      <li>
        <h4>
          <a href="#-----roadmap--">
            📝 Roadmap
          </a>
        </h4>
      </li>
      <li>
        <h4>
          <a href="#-----contributing--">
            👍 Contributing
          </a>
        </h4>
      </li>
      <ul>
        <li>
          <h5>
            <a href="#-----how-to-contribute--">
              ❔ How To Contribute
            </a>
          </h5>
        </li>
      </ul>
      <li>
        <h4>
          <a href="#-----contact--">
            ⭐ Contact
          </a>
        </h4>
      </li>
      <li>
        <h4>
          <a href="#-----acknowledgments--">
            👏 Acknowledgments
          </a>
        </h4>
      </li>
      <li>
        <h4>
          <a href="#-----license--">
            📜 License
          </a>
        </h4>
      </li>  
    </ol>
  </details>
  <br>
  <hr>
</nav>


<!-- ABOUT THE PROJECT -->
<p>
  <h2> 
    ℹ️ About This Project
  </h2>
  <br>
  These scripts are for Google Sheets to interface with Fuzworks API
  <br>
  Free to use as you want as long as credit is given when due.
  <br>
  <p align="right">🔗(<a href="#readme-top">back to top</a>)</p>
  <hr>
</p>

<!-- GETTING STARTED -->
<p>
  <h2>
    🚼 Getting Started
  </h2>
  <br>
  <em>
    👥 Just clone the repository to get started editing your very own copy of this project... 
  </em>
  <ul>
    <li>
      <h3>
        Clone the repo:
      </h3>
    </li>
  </ul>
  
```sh 
git clone https://github.com/PhobiaCide/EveProjects.git
```

<br>
</p>

<!-- Prerequisites -->
<p>
  <h3>
    🔰 Prerequisites
  </h3>
  <br>
  <ul>
    <li>
      CCP maintains a database of all Eve online static data. 
    </li>
    <li>
      Whenever a change is made to the database, CCP release the data in what is refered to as the Static Data Export.
    </li>
    <li>
      The
      <a href="https://www.fuzzwork.co.uk/2021/07/17/understanding-the-eve-online-sde-1/">
        Fuzzwork
      </a>
      SDE Conversion is a selection of tables from the SDE converted in .csv format and made available to download individually.
    </li>
  </ul>
  <br>
</p>        
      
<!-- Installation -->    
<p>
  <h3>
    📦 Installation
  </h3>
  <br>
  <ol>
    <li>
      Copy the contents of EveSdeImport.js to the Google Sheet Script editor (or Clasp for local editing).
    </li>
    <li>
      Save the apps script project and run <code>importSDE()</code>
    </li>
    <li>
      Give the script permission to run
    </li>
  </ol>
  <p align="right">🔗(<a href="#readme-top">back to top</a>)</p>
  <hr>
</p>

<!-- USAGE -->
<p>
  <h2>
    💼 Usage
  </h2>
  <br>
  <h3>
    📃 Scripts
  </h3>
  <details>
    <summary>
      <code>onOpen()</code>
      <ul>
        <li>
          Executes when the spreadsheet is opened  
        </li>
        <li>
          Adds a custom menu item to the Spreadsheet called, "Sheet Tools"
        </li>
        <li>
          Adds, "Update SDE Data" menu item within the "Sheet Tools" menu that calls, 
          <code>importSDE()</code>
          when it is clicked
        </li>
      </ul>
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
  <br>
  <details>
    <summary>
      <code>importSDE()</code>
      <ol>
        <li>
          Downloads a preselected list of 
          <a href="https://www.fuzzwork.co.uk/2021/07/17/understanding-the-eve-online-sde-1/">
            Fuzzwork
          </a>
        SDE conversion files
      </li>
      <li>
        Converts those .csv files into two-dimensional arrays
      </li>
      <li>
        Records the data from those tables each onto a dedicated sheet
      </li>
    </ol>
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
  
<h3>
  🧮 GESI wrappers
</h3>
<br>

This will enable existing google sheets with authorized Eve Online characters to work.
They're not intended for New Sheets or Adding new characters to the sheet GESI installer isn't working properly.

To get your sheet operational, copy the contents of GESI.wrappers.js to a .gs file in your Script editor.

Verify that the GESI Library is installed as a Script Editor Library. Follow the GESI Documentation below:

<blockquote>
  
### Script Editor (taken from Blacksmoke's Documentation)

By default, one does not have access to GESI functions for use in custom functions in the script editor. In order to gain access to these functions for custom logic, add GESI as a library to your script:

1. Install the add-on, follow the [setup instructions](#setup).
1. Within the script editor, click the `+` icon next to the `Libraries` heading.
1. Paste in `1KjnRVVFr2KiHH55sqBfHcZ-yXweJ7iv89V99ubaLy4A7B_YH8rB5u0s3` into the `Script ID` box and click `Look up`.
1. Select the most recent version that is _NOT_ `HEAD`, and click `Add`.

In order to use this, functions must be perpended with `GESI`, which maps to the `Identifier` field in the Libraries modal. For example, `GESI.universe_types();`

**NOTE:** Libraries _do not_ update on their own. When a new version of GESI is released, click on `GESI` under the `Libraries` heading and select the most recent version that is _NOT_ `HEAD`.
</blockquote>

<p align="right">🔗(<a href="#readme-top">back to top</a>)</p>
<hr>
</p>

<!-- ROADMAP -->
<p>
  <h2>
    📝 Roadmap
  </h2>
  <br>

- [x] Spruce up README.md
  - [x] Add Emojis
  - [x] Refine README.md
  - [ ] Finish README.md
- [x] Add LICENSE.txt
- [ ] Set Up Issues
  - [ ] List All Issues
  - [ ] Fix All Issues

  ⚠️ 
  <em>
    See
    <a href="https://github.com/PhobiaCide/EveProjects/issues">
      Open Issues
    </a> 
    for a full list of proposed features (and known issues).
  </em>  
  <p align="right">🔗(<a href="#readme-top">back to top</a>)</p>
  <hr>
</p>

<!-- CONTRIBUTING -->
<p>
  <h2>
    👍 Contributing
  </h2>
  <br>
  <ul>
    <li>
      💪
      <em>
        Contributions are what make the open source community such an amazing place to learn, inspire, and create_...
      </em>
    </li>
    <li>
      👼
     <em>
        Any contributions you make are
        <strong>
          greatly appreciated...
        </strong>
      </em>
    </li>
    <li>
      💭
      <em>
        If you have a suggestion that would make this better, please fork the repo and create a pull request...
      </em>
    </li>
    <li>
      💬
      <em>
        You can also simply open an issue with the tag "enhancement"...
      </em>
    </li>
    <li>
      ⭐
      <em>
        Don't forget to give the project a star! Thanks again!
      </em>
    </li>
  </ul>
  <br>
</p>

<!-- HOW TO CONTRIBUTE -->
<p>
  <h3>
    ❔ How To Contribute
  </h3>
  <br>
  <ol>
    <li>
      🍴 Fork the Project
    </li>
    <li>
      🎨 Create your Feature Branch 
      <code>
        git checkout -b feature/AmazingFeature
      </code>
    </li>
    <li>
      💾 Commit your Changes 
      <code>
        git commit -m 'Add some AmazingFeature'
      </code>
    </li>
    <li>
      📌 Push to the Branch 
      <code>
        git push origin feature/AmazingFeature
      </code>
    </li>
    <li>
      📂 Open a Pull Request
    </li>
  </ol>
  <p align="right">🔗(<a href="#readme-top">back to top</a>)</p>
  <hr>
</p>

<!-- CONTACT -->
<p>
  <h2>
    🌟 Contact
  </h2>
  <br>
  <ul>
    <li>
      📧 email: aamason86@gmail.com
    </li>
    <li>
      :octocat: GitHub Profile: [PhobiaCide](https://github.com/PhobiaCide)
    </li>
  </ul>
  <p align="right">🔗(<a href="#readme-top">back to top</a>)</p>
  <hr>
</p>

<!-- ACKNOWLEDGMENTS -->
<p>
  <h2>
    👏 Acknowledgments
  </h2>
  <br>
  <h3>
    Special thanks to:
  </h3>
  <ul>
    <li>
      <a href="https://github.com/fuzzysteve/">Fuzzy Steve</a>
    </li>
    <li>
      <a href="https://github.com/Blacksmoke16">Blacksmoke16</a>
    </li>
    <li>
      <a href="https://www.webpagefx.com/tools/emoji-cheat-sheet">Github Emoji Cheat Sheet</a>
    </li>
    <li>
      <a href="https://shields.io">Img Shields</a>
    </li>
  </ul>
  <p align="right">🔗(<a href="#readme-top">back to top</a>)</p>
  <hr>
</p>

<!-- LICENSE -->
<p>
  <h2>
    📜 License
  </h2>
  <br>
  <p align="center">
    Distributed under the 
    <strong>
      CC0 1.0 Universal
    </strong>
    . See `LICENSE.txt` for more information.
    <br>
    <strong>
      Copyright ©️ 2022 
    </strong>
  </p>
  <p align="right">🔗(<a href="#readme-top">back to top</a>)</p>
  <hr>
</p>

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
