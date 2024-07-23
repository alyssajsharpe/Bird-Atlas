import { Form } from 'react-bootstrap';
import Stack from 'react-bootstrap/Stack';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { useState } from 'react';
import React from 'react';

const birdColors = ["Blue","Red","Black","White","Yellow"];
const birdSizes = ["Tiny","Small","Medium","Large","Humungus"];
const birdRegions = ["North America","Western Europe"];
const birdLocation = ["Ocean","Trees","Pond","Ground","Soaring"];


const Sidebar = ({ birdSize }) => {
  return (
    <>

      <div className="white-bg black-text grey-border custom-height">
          <div className='filter-header padding-top-small text-align-center'>Bird Specifics</div>
          <div className="p-1">Index size: {birdSize} birds</div>
          <Container>
            <Row>
              <div className="p-4">
                  {/* Colors */}
                  <div className="p-2">
                    <h3 className='filter-section-header padding-bottom-xsmall'>Color</h3>
                    <Stack direction="horizontal" gap={3} className="color-checkboxes">
                      {birdColors.map((color, index) => (
                        <div key={index} className='p-1 custom-cursor'>
                          <Form.Check 
                            type='checkbox'
                            id={`default-checkbox-${index}`} 
                            label={color}
                          />
                        </div>
                      ))}
                    </Stack>
                  </div>
                  {/* Sizes */}
                  <div className="p-2">
                    <h3 className='filter-section-header padding-bottom-xsmall'>Size</h3>
                      <Stack direction="horizontal" gap={3} className="color-checkboxes">
                        {birdSizes.map((size, index) => (
                          <div key={index} className='p-1 custom-cursor'>
                            <Form.Check 
                              type='checkbox'
                              id={`default-checkbox-${index}`}
                              label={size}
                            />
                          </div>
                        ))}
                      </Stack>
                  </div>
                  {/* Region */}
                  <div className="p-2">
                    <h3 className='filter-section-header padding-bottom-xsmall'>Region</h3>
                      <Stack direction="horizontal" gap={3} className="color-checkboxes">
                        {birdRegions.map((region, index) => (
                          <div key={index} className='p-1 custom-cursor'>
                            <Form.Check 
                              type='checkbox'
                              id={`default-checkbox-${index}`}
                              label={region}
                            />
                          </div>
                        ))}
                      </Stack>
                  </div>
                   {/* Where did you see the bird? */}
                   <div className="p-2">
                    <h3 className='filter-section-header padding-bottom-xsmall'>Location</h3>
                      <Stack direction="horizontal" gap={3} className="color-checkboxes">
                        {birdLocation.map((location, index) => (
                          <div key={index} className='p-1 custom-cursor'>
                            <Form.Check 
                              type='checkbox'
                              id={`default-checkbox-${index}`}
                              label={location}
                            />
                          </div>
                        ))}
                      </Stack>
                  </div>
              </div>
              </Row>
          </Container>
      </div>
    </>
  );
};

export default Sidebar;
