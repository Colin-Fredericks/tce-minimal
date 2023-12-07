import type {
  DataInitializer,
  ElementData,
  ElementManifest,
} from './interfaces';

// Element unique id within the target system (e.g. Tailor)
// You must name your thing here or the platform
// will probably accidentally munge it.
export const type = 'VPAL_MINIMAL_CUSTOM_ELEMENT';

// Display name (e.g. shown to the author)
// You must describe your thing so people know what it is.
export const name = 'The most basic of custom elements';

// Function which inits the TE state.
// You must provide a default authoring state for your thing.
// You do not need to include student-side state here.
export const initState: DataInitializer = (): ElementData => ({
  author_data: {
    instructions: "Input instruction text here",
  },
  display_name: "Minimal TE",
});

// Can be loaded from package.json
export const version = '1.0';

// UI configuration for Tailor CMS
const ui = {
  // Display icon, https://pictogrammers.com/library/mdi/
  icon: 'mdi-cube',
  // Does element support only full width or can be used within layouts
  // (e.g. 50/50 layout)
  forceFullWidth: true,
};

export const mocks = {
  displayContexts: [{ name: 'Test', data: { exampleValue: 'test' } }],
};

const manifest: ElementManifest = {
  type,
  version: '1.0',
  name,
  ssr: false,
  initState,
  ui,
  mocks,
};

export default manifest;
export * from './interfaces';
