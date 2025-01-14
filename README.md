# Register Grouped Format Type

[![npm version](https://badge.fury.io/js/%40technote-space%2Fregister-grouped-format-type.svg)](https://badge.fury.io/js/%40technote-space%2Fregister-grouped-format-type)
[![Build Status](https://travis-ci.org/technote-space/register-grouped-format-type.svg?branch=master)](https://travis-ci.org/technote-space/register-grouped-format-type)
[![Coverage Status](https://coveralls.io/repos/github/technote-space/register-grouped-format-type/badge.svg?branch=master)](https://coveralls.io/github/technote-space/register-grouped-format-type?branch=master)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/616394da0ba143d7b3aee4f79d318cdf)](https://www.codacy.com/app/technote-space/register-grouped-format-type?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=technote-space/register-grouped-format-type&amp;utm_campaign=Badge_Grade)
[![License: GPL v2+](https://img.shields.io/badge/License-GPL%20v2%2B-blue.svg)](http://www.gnu.org/licenses/gpl-2.0.html)
[![WordPress: >=5.0](https://img.shields.io/badge/WordPress-%3E%3D5.0-brightgreen.svg)](https://wordpress.org/)

This is a gutenberg's library to provides method to register grouped RichText format types,   
which will be gathered by DropDown.  
The controls are active only when it is able to toggle format.

![動作](https://raw.githubusercontent.com/technote-space/register-grouped-format-type/master/screenshot1.png)

## How to use
### Use from npm
[https://www.npmjs.com/package/@technote-space/register-grouped-format-type](https://www.npmjs.com/package/@technote-space/register-grouped-format-type)

```
npm install --save @technote-space/register-grouped-format-type
```

`register.js`
```
import { RichText } from '@technote-space/register-grouped-format-type';

const { ToolbarButton } = wp.components;
const { toggleFormat } = wp.richText;
const { registerFormatTypeGroup, registerGroupedFormatType } = RichText;

// prepare utility function to create args
const getProps = ( group, name ) => ( {
	name,
	group,
	create: ( { args, formatName } ) => <ToolbarButton
		icon='admin-customizer'
		title={ <div className={ name }>{ name }</div> }
		onClick={ () => args.onChange( toggleFormat( args.value, { type: formatName } ) ) }
		isActive={ args.isActive }
		extraProps={ {
			label: name,
			tooltip: <div className='dropdown-tooltip'>
				<div className={ name }>{ name }</div>
			</div>,
		} }
	/>,
} );

// register format type group setting
registerFormatTypeGroup( 'test2', {
	icon: 'admin-network',
} );

// register grouped format types
registerGroupedFormatType( getProps( 'test1', 'dropdown2-test1' ) );
registerGroupedFormatType( getProps( 'test2', 'dropdown2-test2' ) );
registerGroupedFormatType( getProps( 'test2', 'dropdown2-test3' ) );
```

Compile and enqueue script.

```
<script type="text/javascript" src="/assets/register.js"></script>
```

### Use from download

`register.js`
```
( function( toggleFormat, el, ToolbarButton, registerFormatTypeGroup, registerGroupedFormatType ) {
	// prepare utility function to create args
	function getProps( group, name ) {
		return {
			name: name,
			group: group,
			create: function( args ) {
				return el( ToolbarButton, {
					icon: 'admin-customizer',
					title: el( 'div', { className: name }, name ),
					onClick: function() {
						args.args.onChange( toggleFormat( args.args.value, { type: args.formatName } ) );
					},
					isActive: args.args.isActive,
					extraProps: {
						label: name,
						tooltip: el( 'div', { className: 'dropdown-tooltip' }, el( 'div', { className: name }, name ) ),
					},
				} );
			},
		};
	}

	// register format type group setting
	registerFormatTypeGroup( 'test2', {
		icon: 'admin-network',
	} );

	// register grouped format types
	registerGroupedFormatType( getProps( 'test1', 'dropdown2-test1' ) );
	registerGroupedFormatType( getProps( 'test2', 'dropdown2-test2' ) );
	registerGroupedFormatType( getProps( 'test2', 'dropdown2-test3' ) );
}(
	wp.richText.toggleFormat,
	wp.element.createElement,
	wp.components.ToolbarButton,
	Technote.Gutenberg.RichText.registerFormatTypeGroup,
	Technote.Gutenberg.RichText.registerGroupedFormatType,
) );
```

Download [Release version](https://raw.githubusercontent.com/technote-space/register-grouped-format-type/master/build/index.js) and enqueue scripts.
```
<script type="text/javascript" src="/assets/register-grouped-format-type/index.js"></script>
<script type="text/javascript" src="/assets/register.js"></script>
```


## Details
### `registerGroupedFormatType`
Register grouped format type.
#### definition
```
/**
 * @param {string} name name
 * @param {string} title title
 * @param {string} tagName tag name
 * @param {string} className class name
 * @param {function} create create component function
 * @param {function} createInspector create inspector component function
 * @param {string} group group
 * @param {string} inspectorGroup inspector group
 * @param {object} settings settings
 * @return {object|null} registered settings
 */
registerGroupedFormatType( {
	name,
	title = name,
	tagName = 'span',
	className = name,
	create,
	createInspector,
	group = name,
	inspectorGroup = name,
	...settings
} )
```
#### arguments
- name (required)
  - format name
  - [detail](https://github.com/WordPress/gutenberg/blob/release/5.6/packages/rich-text/src/register-format-type.js#L17)
- title
  - format title
  - [detail](https://github.com/WordPress/gutenberg/blob/release/5.6/packages/rich-text/src/register-format-type.js#L211)
- tagName
  - tag name
  - [detail](https://github.com/WordPress/gutenberg/blob/release/5.6/packages/rich-text/src/register-format-type.js#L19)
- className
  - class name
  - [detail](https://github.com/WordPress/gutenberg/blob/release/5.6/packages/rich-text/src/register-format-type.js#L20)
  - You can use multiple classes (space separated).
- create (required)
  - function which returns the component like `ToolbarButton`
- group (required)
  - group name
  - When the number of items in the same group is more than 1, they will be gathered by DropDown.

### `registerFormatTypeGroup`
Register group settings of format type.  
#### definition
```
/**
 * @param {string} name group name
 * @param {object} setting setting
 * @returns {object} registered setting
 */
registerFormatTypeGroup( name, setting = {} )
```  
#### arguments
- name (required)
  - group name
- setting
  - group setting  
  
`default setting`
```
{
	icon: 'admin-customizer',
	position: 'bottom left',
	label: name,
	menuLabel: name,
	className: undefined,
	menuClassName: undefined,
	inspectorSettings: {},
}
```

## dependencies
- wp-components
- wp-data
- wp-editor
- wp-element
- wp-rich-text
- wp-url
- lodash

## @see
[Gutenberg Utils](https://github.com/technote-space/gutenberg-utils)

## Author
[GitHub (Technote)](https://github.com/technote-space)  
[Blog](https://technote.space)
