import {
  Rule,
  SchematicContext,
  Tree,
  apply,
  url,
  move,
  forEach,
  FileEntry,
  mergeWith,
  MergeStrategy,
  template,
  //applyTemplates,
} from '@angular-devkit/schematics';
import { join, normalize } from 'path';
import { getWorkspace } from '@schematics/angular/utility/config';
import { HelloWorldSchema } from './schema';
import { classify, dasherize, camelize, underscore } from '@angular-devkit/core/src/utils/strings';

// required for template manipulations
const stringUtils = {classify, dasherize, camelize, underscore };

// tools provided by angluar dev kit you might want to use
// import {
//   JsonAstObject,
//   JsonObject,
//   JsonValue,
//   Path,
//   normalize,
//   parseJsonAst,
//   strings,
// } from '@angular-devkit/core';

export function setupOptions(host: Tree, options: HelloWorldSchema): Tree {
  
  const workspace = getWorkspace(host);
  if (!options.project) {
    options.project = Object.keys(workspace.projects)[0];
  }

  const project = workspace.projects[options.project];
  options.path = join(normalize(project.root), 'src');
  return host;
}

/**
 * Combining two different tutorials here from Matt Raible and Tomas Trajan -
 * 
 * You don't have to export the function as default. You can also have more than one rule factory
 * per file.
 * @param _options 
 * 
 */
export function helloWorldComponent(_options: HelloWorldSchema): Rule {
  return (tree: Tree, _context: SchematicContext) => {

    setupOptions(tree, _options);

    const movePath = normalize(_options.path + '/');


    // must define and apply classify, dasherize, etc here to manipulate strings
    // and templates

    // array is an array of rules
    const templateSource = apply(url('./files/src'), [
      
      // still trying to figure out the difference between
      // template and applyTemplates?
      template({
        ..._options,
        classify: stringUtils.classify,
        dasherize: stringUtils.dasherize,
        name: _options.name
      }),
      
      // applyTemplates({
      //   ..._options,
      //   classify: stringUtils.classify,
      //   dasherize: stringUtils.dasherize,
      //   name: _options.name
      // }),
      move(movePath),
      // fix for https://github.com/angular/angular-cli/issues/11337
      forEach((fileEntry: FileEntry) => {

        if (tree.exists(fileEntry.path)) {
          tree.overwrite(fileEntry.path, fileEntry.content);
          return null;
        }

        return fileEntry;
      }),

    ]);

    const rule = mergeWith(templateSource, MergeStrategy.Overwrite);

    tree.create('hello.ts', 'console.log("Hello, World")');
    //return tree;

    return rule(tree, _context);
  };
}
