import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useFormik } from "formik";
import { useQuery, useMutation } from 'react-query';

import Trail from "../components/molecules/Trail/Trail";
import SoundCard from '../components/atoms/SoundCard/SoundCard';

import api from '../api/api';

const Header = styled.h1`
  text-align: center;
  margin-top: 2rem;
`;

const Search = styled.div`
  margin: 3rem 0 2rem 0;
`;

const Input = styled.input`
  color: #eee;
  padding: 0.6rem 1rem;
  font-size: 1.3rem;
  background-color: #262626;
  border: 1px solid #3a3a3a;
  border-radius: 13px;

  &:focus {
    color: #eee;
    padding: 0.6rem 1rem;
    background-color: #222;
    border: 1px solid #f3a327;
    border-radius: 13px;
    box-shadow: none;
  }
`;

const InputLabel = styled.label`
  color: #f29404;
`;

const InputIcon = styled.span`
  color: #f29404;
  fill: grey;
  min-width: 32px;
  padding-left: 12px;
  position: relative;
  float: right;
  margin-right: 15px;
  margin-top: -40px;
  color: #f3a327;
  display: ${props => props.hidden ? "none" : "initial"};
`;

const IndexPage = () => {
  const [soundList, setSoundList] = useState([]);
  const { data } = useQuery('fetchSounds', api.getSounds);
  const sendSound = useMutation(api.sendSound, {
    onSuccess: () => {
      //
    },
  });

  const formik = useFormik({
    initialValues: {
      search: "",
    },
    onSubmit: (submitValues) => {
      if (submitValues.search) handlePostSend(submitValues.search);
    },
  });

  const { values, handleSubmit, getFieldProps } = formik;

  useEffect(() => {
    if (values.search) setSoundList(data.filter((sound: string) => sound.includes(values.search)));
    else setSoundList(data);
  }, [values.search, data]);

  useEffect(() => {
    setSoundList(data || []);
  }, [data]);

  const handlePostSend = async (searchValue: string) => {
    try {
      await sendSound.mutate(searchValue);
    } catch (error) {
      //
    }
  };

  return (
    <>
      <title>{`${process.env.SITE_NAME}`}</title>
      <Header>{`Soundboard - ${process.env.SITE_NAME}`}</Header>
      <div className="container">
        <div className="row">
          <div className="col-md-6 col-sm-12">
            <Search>
              <form onSubmit={handleSubmit}>
                <InputLabel htmlFor="search" className="form-label">
                  Recherche
                </InputLabel>
                <Input
                  autoComplete="off"
                  className="form-control"
                  placeholder="..."
                  {...getFieldProps("search")}
                />
                <InputIcon
                  hidden={false}
                >
                  <svg
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <g>
                      <path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path>
                    </g>
                  </svg>
                </InputIcon>
              </form>
            </Search>
          </div>
        </div>
        <div className="row">
          <Trail>
            {soundList.map((sound: string) => (
              <div onClick={() => handlePostSend(sound)} key={`sound_${sound}`}>
                <SoundCard label={sound} />
              </div>
            ))}
          </Trail>
        </div>
      </div>
    </>);
}

export default IndexPage;
