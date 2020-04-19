//import { Tree } from '@angular-devkit/schematics';
import { SchematicTestRunner, UnitTestTree } from '@angular-devkit/schematics/testing';
import * as path from 'path';
import { HelloWorldSchema } from './schema';

describe('hello-world-component', () => {

  const collectionPath = path.join(__dirname, '../collection.json');

  // Tomas Trajan tutorial
  // it('works', () => {
  //   const runner = new SchematicTestRunner('schematics', collectionPath);
  //   runner.runSchematicAsync('hello-world-component', {}, Tree.empty()).toPromise().then(tree => {

  //     expect(tree.files).toEqual(['/hello.ts']);
  //   });
    
  // });

  // Matt Raible tutorial
  
  const schematicRunner = new SchematicTestRunner(
    'schematics',
    path.join(__dirname, './../collection.json'),
  );

  const workspaceOptions: any = { 
    name: 'workspace',
    newProjectRoot: 'projects',
    version: '0.5.0',
  };

  const appOptions: any = { 
    name: 'schematest'
  };

  const schemaOptions: HelloWorldSchema = { 
    name: 'foo'
  };

  let appTree: UnitTestTree

  beforeEach( async () => { 
     
    appTree = await schematicRunner.runExternalSchematicAsync('@schematics/angular', 'workspace', workspaceOptions)
    .toPromise();

    appTree = await schematicRunner.runExternalSchematicAsync('@schematics/angular', 'application', appOptions, appTree)
    .toPromise();

  });

  it('works', async () => {
    const runner = new SchematicTestRunner('schematics', collectionPath);
    await runner.runSchematicAsync('hello-world-component', schemaOptions, appTree).toPromise().then(tree => {
      const appComponent = tree.readContent('/projects/schematest/src/app/app.component.ts'); 
      expect(appComponent).toContain(`name = '${schemaOptions.name}'`); 
    });
  });

});