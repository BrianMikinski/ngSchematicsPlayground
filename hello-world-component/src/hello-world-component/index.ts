import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';

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


// You don't have to export the function as default. You can also have more than one rule factory
// per file.
export function helloWorldComponent(_options: any): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    return tree;
  };
}
