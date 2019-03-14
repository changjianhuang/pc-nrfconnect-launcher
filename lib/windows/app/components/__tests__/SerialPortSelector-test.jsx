/* Copyright (c) 2015 - 2017, Nordic Semiconductor ASA
 *
 * All rights reserved.
 *
 * Use in source and binary forms, redistribution in binary form only, with
 * or without modification, are permitted provided that the following conditions
 * are met:
 *
 * 1. Redistributions in binary form, except as embedded into a Nordic
 *    Semiconductor ASA integrated circuit in a product or a software update for
 *    such product, must reproduce the above copyright notice, this list of
 *    conditions and the following disclaimer in the documentation and/or other
 *    materials provided with the distribution.
 *
 * 2. Neither the name of Nordic Semiconductor ASA nor the names of its
 *    contributors may be used to endorse or promote products derived from this
 *    software without specific prior written permission.
 *
 * 3. This software, with or without modification, must only be used with a Nordic
 *    Semiconductor ASA integrated circuit.
 *
 * 4. Any software provided in binary form under this license must not be reverse
 *    engineered, decompiled, modified and/or disassembled.
 *
 * THIS SOFTWARE IS PROVIDED BY NORDIC SEMICONDUCTOR ASA "AS IS" AND ANY EXPRESS OR
 * IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
 * MERCHANTABILITY, NONINFRINGEMENT, AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL NORDIC SEMICONDUCTOR ASA OR CONTRIBUTORS BE LIABLE
 * FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
 * DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
 * SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
 * CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR
 * TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF
 * THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

/* eslint-disable import/first */

// Do not render react-bootstrap components in tests
jest.mock('react-bootstrap', () => ({
    Dropdown: 'Dropdown',
    MenuItem: 'MenuItem',
    DropdownToggle: 'DropdownToggle',
    DropdownMenu: 'DropdownMenu',
}));

// Do not decorate components
jest.mock('../../../../util/apps', () => ({
    decorate: component => component,
}));

import React from 'react';
import renderer from 'react-test-renderer';
import SerialPortSelector from '../SerialPortSelector';

const SEGGER_VENDOR_ID = '0x1366';

describe('SerialPortSelector', () => {
    it('should render empty port list', () => {
        expect(renderer.create(
            <SerialPortSelector
                ports={[]}
                onToggle={() => {}}
                onSelect={() => {}}
                onDeselect={() => {}}
                bindHotkey={() => {}}
            />,
        )).toMatchSnapshot();
    });

    it('should render two ports', () => {
        expect(renderer.create(
            <SerialPortSelector
                ports={[
                    {
                        comName: '/dev/tty0',
                        serialNumber: '123456',
                        vendorId: SEGGER_VENDOR_ID,
                    }, {
                        comName: '/dev/tty1',
                        serialNumber: '456789',
                        vendorId: SEGGER_VENDOR_ID,
                    },
                ]}
                onToggle={() => {}}
                onSelect={() => {}}
                onDeselect={() => {}}
                bindHotkey={() => {}}
            />,
        )).toMatchSnapshot();
    });

    it('should render only segger ports by default filter', () => {
        expect(renderer.create(
            <SerialPortSelector
                ports={[
                    {
                        comName: '/dev/tty0',
                        serialNumber: '123456',
                        vendorId: '0x1234',
                    }, {
                        comName: '/dev/tty1',
                        serialNumber: '456789',
                        vendorId: SEGGER_VENDOR_ID,
                    },
                ]}
                onToggle={() => {}}
                onSelect={() => {}}
                onDeselect={() => {}}
                bindHotkey={() => {}}
            />,
        )).toMatchSnapshot();
    });

    it('should render filtered ports', () => {
        expect(renderer.create(
            <SerialPortSelector
                ports={[
                    {
                        comName: '/dev/tty0',
                        serialNumber: '123456',
                        vendorId: '0x1234',
                    }, {
                        comName: '/dev/tty1',
                        serialNumber: '456789',
                        vendorId: SEGGER_VENDOR_ID,
                    },
                ]}
                onToggle={() => {}}
                onSelect={() => {}}
                onDeselect={() => {}}
                bindHotkey={() => {}}
                filter={port => port.serialNumber === '123456'}
            />,
        )).toMatchSnapshot();
    });

    it('should render two ports, one selected', () => {
        expect(renderer.create(
            <SerialPortSelector
                ports={[
                    {
                        comName: '/dev/tty0',
                        serialNumber: '123456',
                        vendorId: SEGGER_VENDOR_ID,
                    }, {
                        comName: '/dev/tty1',
                        serialNumber: '456789',
                        vendorId: SEGGER_VENDOR_ID,
                    },
                ]}
                selectedPort="/dev/tty1"
                onToggle={() => {}}
                onSelect={() => {}}
                onDeselect={() => {}}
                bindHotkey={() => {}}
            />,
        )).toMatchSnapshot();
    });

    it('should render empty list while loading', () => {
        expect(renderer.create(
            <SerialPortSelector
                ports={[
                    {
                        comName: '/dev/tty0',
                        serialNumber: '123456',
                        vendorId: SEGGER_VENDOR_ID,
                    },
                ]}
                isLoading
                onToggle={() => {}}
                onSelect={() => {}}
                onDeselect={() => {}}
                bindHotkey={() => {}}
            />,
        )).toMatchSnapshot();
    });

    it('should render empty list while loading and port is selected', () => {
        expect(renderer.create(
            <SerialPortSelector
                ports={[
                    {
                        comName: '/dev/tty0',
                        serialNumber: '123456',
                        vendorId: SEGGER_VENDOR_ID,
                    },
                ]}
                selectedPort="/dev/tty0"
                isLoading
                onToggle={() => {}}
                onSelect={() => {}}
                onDeselect={() => {}}
                bindHotkey={() => {}}
            />,
        )).toMatchSnapshot();
    });
});
