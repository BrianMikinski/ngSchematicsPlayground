# ngSchematics Playground
Angular 2+ schematics playground. This repository is a basic Schematic implementation that serves as a starting point to create and publish Schematics to NPM.

# Commands

### Schematics Dev Kit Installation
```console
npm i -g @angular-devkit/schematics-cli
```

### Creating new Schematic

```console
schematics blank --name=hello-world-component
```

### Building Schematic

```console
npm run build
```

### Running Schematic

```console
schematics .:hello-world-component
```

### Debugging

Configured in .vscode folder and can but iniated run command (F5).

- collection.json
- setting the schema.json is not working as expected. If you remove it you are able to debug, if you leave it in there you are not.
- NOTE: 
    - **YOU MUST IN INCLUDE DEFAULTS / OR PASS IN VARIABLE DEFINITIONS FOR ALL OF YOUR SCHEMA PROPERTIES, OTHERWISE YOU WILL NOT BE ABLE TO DEBUG!**
    - **There is a bug in the debugging of schematics and only strings will be parsed from the command line. Your code will not run and will fail silently before hitting the schematic index.ts file. See github issues to track the fixing of this.**

### Testing
To test locally, install `@angular-devkit/schematics-cli` globally and use the `schematics` command line tool. That tool acts the same as the `generate` command of the Angular CLI, but also has a debug mode.

Check the documentation with
```console
schematics --help
```

### Unit Testing
`npm run test` will run the unit tests using jasmine as a runner and test framework.

### Local Publishing
`npm pack` will pack the project. **Note: MAKE SURE YOU HAVE BUILT THE PROJECT AND ARE NOT EXCLUDING THE .JS .d.ts AND ALL OTHER FILES REQUIRED FOR THE SCHEMATIC TO RUN IN YOUR .GITIGNORE FILE. THIS WILL CAUSE IT ALL TO NOT WORK."
`ng new my-test-app --routing --style css`
`cd my-test-app`
`npm install ../hello-world-component- tgz`
`ng g hello-world-component`

This will install your package locally and then you can use it in the current project.

### NPM Publishing

To publish, simply do:

```console
npm run build
npm publish
```

### Resources
- Authoring schematics
    - Templates and how to build them https://angular.io/guide/schematics-for-libraries
        - Dasherize, classify, etc - 
        - **Note, you must pass the template files onto a rule in order to use them, otherwise they will come back as null references. **
    - Authoring Schematics
        - https://angular.io/guide/schematics-authoring#defining-input-options-with-a-schema-and-interfaces

- Tomas Trajan
    - https://medium.com/@tomastrajan
    - https://medium.com/@tomastrajan/total-guide-to-custom-angular-schematics-5c50cf90cdb4
    - https://www.youtube.com/watch?v=M5YSPas3qFo
- Mike Hartington
    - Examples of schematic template if statements, string manipulations, etc.
    - ```
        import { Component, OnInit } from '@angular/core';
        <% if(routePath) { %>import { ActivatedRoute, Params } from '@angular/router';<% } %>
        @Component({
        selector: '<%= selector %>',
        templateUrl: './<%= kebabCase(name) %>.page.html',
        styleUrls: ['./<%= kebabCase(name) %>.page.<%= styleext %>'],
        })
        export class <%= upperFirst(camelCase(name)) %>Page implements OnInit {

        <% if(routePath) { %>public params: Params;<% } %>

        constructor(<% if(routePath) { %>private route: ActivatedRoute <% } %>) { }

        ngOnInit() {
            <% if(routePath) { %>this.params = this.route.snapshot.params;<% } %>
        }

        }
      ```
- Template Loops, might be done this way. This is to be determined
    - https://scotch.io/tutorials/use-ejs-to-template-your-node-application
    - ```
        <% drinks.forEach(function(drink) { %>
        <li><%= drink.name %> - <%= drink.drunkness %></li>
        <% }); %>
      ```
- Angular Api for classify can be found here
    - https://github.com/angular/angular-cli/blob/9de389fb770568919d6f2465cc155e0835926eaf/packages/angular_devkit/core/src/utils/strings.ts
- Schematics - An Introduction
    - https://blog.angular.io/schematics-an-introduction-dc1dfbc2a2b2
- Michael Ericksen
    - Debugging and Testing Angular Schematics in VS Code
    - https://medium.com/@michaelericksen_12434/debugging-and-testing-angular-schematics-in-vs-code-8e697b73ad8c
- Matt Vaughn
    - How to debug an Angular Schematic
    - https://medium.com/@angularlicious/how-to-debug-an-angular-schematic-using-visual-studio-3bbe4fde8fd8
- Matt Raible
    - https://developer.okta.com/blog/2019/02/13/angular-schematics
    - https://www.youtube.com/watch?v=bLLJqagO_dg
    - https://www.youtube.com/watch?v=ANwZIt3Ni2s
- Schematics Starter
    - https://github.com/schuchard/schematic-starter
- Jonathan Campos
    - Angular Schematics: Simple Schematic
    - https://medium.com/rocket-fuel/angular-schematics-simple-schematic-76be2aa72850
- Chris Noring
    - Angular Schematics - the unknown hero
    - https://www.youtube.com/watch?v=_LPzY9GrNwY

### Notable Github Issues

- How to overwrite file with angular schematics
    - https://stackoverflow.com/questions/48957132/how-to-overwrite-file-with-angular-schematics
- MigrationStrategy error
    - https://github.com/angular/angular-cli/issues/11246
- MergeStrategy seems to be completely broken (mergeWith failure)
    - https://github.com/angular/angular-cli/issues/11337
- [error] ng/schematics - Data path "" should have required property 'name'
    - https://github.com/ngrx/platform/issues/1026
- Data path "" should have required property 'name'. #47
    - Angular toolkit https://github.com/ionic-team/angular-toolkit/issues/47
- Boolean options not parsed correctly on schematics cli
    - https://github.com/angular/angular-cli/issues/12150
- An unhandled exception occurred: Cannot find module '@angular-devkit/core'
    - https://github.com/angular/angular-cli/issues/16868


