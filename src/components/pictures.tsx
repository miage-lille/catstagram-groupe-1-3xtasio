import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { getSelectedPicture, picturesSelector } from '../reducer';
import ModalPortal from './modal';
import { closeModal, selectPicture } from '../actions';
import { Picture } from '../types/picture.type';
import { fold, isSome, Option } from 'fp-ts/lib/Option';

const Container = styled.div`
  padding: 1rem;
  justify-content: center;
  display: flex;
  flex-wrap: wrap;
`;

const Image = styled.img`
  margin: 10px;
  object-fit: contain;
  transition: transform 1s;
  max-width: fit-content;
  &:hover {
    transform: scale(1.2);
  }
`;
const Pictures = () => {
  const pictures = useSelector(picturesSelector);
  const selectedPicture = useSelector(getSelectedPicture) as Option<Picture>;;
  const dispatch = useDispatch();

  switch(pictures.kind){
    case 'LOADING':
        return <div>LOADING...</div>;
      case 'FAILURE':
        return <div>ERROR: {pictures.error}</div>;
      case 'SUCCESS':
        return (
          <Container>
            {pictures.pictures.map((picture, index) => (
              <Image key={index} src={picture.previewFormat} alt={picture.author} onClick={() => dispatch(selectPicture(picture))} />
            ))}
            {isSome(selectedPicture) && (
              <ModalPortal
                largeFormat={selectedPicture.value.largeFormat}
                close={() => dispatch(closeModal())}
              />
            )}

          </Container>
        );
}
};

export default Pictures;
