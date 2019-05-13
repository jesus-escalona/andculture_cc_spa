import React from 'react';
import { configure, mount } from 'enzyme';
import {Header} from "../components";
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

describe('<Header />', () => {
    it('should have first child as H2', () => {
        const wrapper = mount(<Header text={'try'} />);
        expect(wrapper.containsMatchingElement(<h2>try</h2>)).toBe(true);
    });

    it('should have two img logo tags inside div', () => {
        const wrapper = mount(<Header text={'try'} />);
        expect(wrapper.containsMatchingElement(<div><img alt='logo'/><img alt='logo'/></div>)).toBe(true);
    });

    it('should render text prop on child H2', () => {
        const text = 'test text';
        const wrapper = mount(<Header text={text} />);
        let h2 = wrapper.find('h2');
        expect(h2.props().children).toEqual(text);
    });
});
