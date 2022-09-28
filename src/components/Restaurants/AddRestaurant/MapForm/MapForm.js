import { View, Text } from 'react-native'
import React from 'react'
import { Modal } from '../../../shared';

export  function MapForm(props) {

  const {show, close} = props;
  return (
    <Modal show={show} close={close}>
      <Text>MapForm</Text>
    </Modal>
  )
}