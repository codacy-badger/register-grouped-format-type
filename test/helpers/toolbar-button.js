const should = require( 'should' );
const { select } = wp.data;
import { PLUGIN_NAME } from '../../src/constant';

import { registerGroupedFormatType, registerFormatTypeGroup } from '../../src/helpers';

describe( 'registerGroupedFormatType test', () => {
	it( 'should not registered format type', () => {
		should( registerGroupedFormatType( { name: 'test1-test1', create: null, group: 'test1' } ) ).null();
		should( registerGroupedFormatType( {
			create: () => {
			},
			group: 'test2',
		} ) ).null();
	} );
	it( 'should registered format type', () => {
		registerGroupedFormatType( {
			name: 'test1-test1',
			group: 'test1',
			create: () => {
				return { props: {} };
			},
		} ).should.type( 'object' );
		registerGroupedFormatType( {
			name: 'test1-test2',
			create: () => {
			},
			group: 'test1',
			title: 'test1-test2-title',
			tagName: 'test1-test2-tag',
			className: 'test1-test2-class',
		} ).should.type( 'object' );
		registerGroupedFormatType( {
			name: 'test2-test1',
			create: ( { args, name } ) => {
				name.should.equal( 'test2-test1' );
				args.should.ownProperty( 'test3' );
				args.test3.should.equal( true );
				return { props: {} };
			},
			createInspector: ( { args, name } ) => {
				name.should.equal( 'test2-test1' );
				args.should.ownProperty( 'test3' );
				args.test3.should.equal( true );
				return { props: {} };
			},
			group: 'test2',
			inspectorGroup: 'test2-inspector',
			attributes: {
				style: 'color: red',
			},
		} ).should.type( 'object' );
		registerGroupedFormatType( {
			name: 'test3-test2',
			create: () => {
			},
			title: 'test3-title',
			tagName: 'test3-tag',
			className: 'test3-class',
			inspectorGroup: 'test2-inspector',
		} ).should.type( 'object' );

		const test1 = select( 'core/rich-text' ).getFormatType( PLUGIN_NAME + '/test1-test1' );
		const test2 = select( 'core/rich-text' ).getFormatType( PLUGIN_NAME + '/test1-test2' );
		const test3 = select( 'core/rich-text' ).getFormatType( PLUGIN_NAME + '/test2-test1' );

		test1.name.should.endWith( 'test1-test1' );
		test1.title.should.equal( 'test1-test1' );
		test1.className.should.equal( 'test1-test1' );
		test1.tagName.should.equal( 'span' );
		test1.edit.should.type( 'function' );
		test1.edit( { test1: true, value: {} } );

		test2.name.should.endWith( 'test1-test2' );
		test2.title.should.equal( 'test1-test2-title' );
		test2.className.should.equal( 'test1-test2-class' );
		test2.tagName.should.equal( 'test1-test2-tag' );

		test3.name.should.endWith( 'test2-test1' );
		test3.edit( { test3: true, value: {} } );
		test3.attributes.should.ownProperty( 'style' );
		test3.attributes.style.should.equal( 'color: red' );
	} );
} );

describe( 'registerFormatTypeGroup test', () => {
	it( 'should registered default setting', () => {
		const group1 = registerFormatTypeGroup( 'group1' );
		group1.should.ownProperty( 'icon' );
		group1.should.ownProperty( 'position' );
		group1.should.ownProperty( 'label' );
		group1.should.ownProperty( 'menuLabel' );
		group1.should.ownProperty( 'className' );
		group1.icon.should.equal( 'admin-customizer' );
		group1.position.should.equal( 'top right' );
		group1.label.should.equal( 'group1' );
		group1.menuLabel.should.equal( 'group1' );
		should( group1.className ).undefined();
	} );
	it( 'should registered setting', () => {
		const group2 = registerFormatTypeGroup( 'group2', {
			icon: 'a',
			position: 'b',
			label: 'c',
			menuLabel: 'd',
			className: 'e',
		} );
		group2.icon.should.equal( 'a' );
		group2.position.should.equal( 'b' );
		group2.label.should.equal( 'c' );
		group2.menuLabel.should.equal( 'd' );
		group2.className.should.equal( 'e' );
	} );
	it( 'should override setting', () => {
		const group1 = registerFormatTypeGroup( 'group1', {
			icon: 'a',
		} );
		group1.icon.should.equal( 'a' );
	} );
} );