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
  template
} from '@angular-devkit/schematics';
import { join, normalize } from 'path';

import { getWorkspace } from '@schematics/angular/utility/config';

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

export function setupOptions(host: Tree, options: any): Tree {
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
export function helloWorldComponent(_options: any): Rule {
  return (tree: Tree, _context: SchematicContext) => {

    setupOptions(tree, _options);

    const movePath = normalize(_options.path + '/');

    // array is an array of rules
    const templateSource = apply(url('./files/src'), [
      template({ ..._options }),
      move(movePath),
      // fix for https://github.com/angular/angular-cli/issues/11337
      forEach((fileEntry: FileEntry) => {

        if (tree.exists(fileEntry.path)) {
          tree.overwrite(fileEntry.path, fileEntry.content);
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