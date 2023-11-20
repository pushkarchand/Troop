import React from 'react';
import template1 from '@assets/images/template1.png'
import template2 from '@assets/images/template2.png'
import template3 from '@assets/images/template3.png'
import design1 from '@assets/images/design1.png'
import design2 from '@assets/images/design1.png'
export const templates=[
    {
        title: "Template one",
        id:1 ,
        // eslint-disable-next-line jsx-a11y/alt-text
        image:<img src={template1}/>
    },
    {
        title: "Template two",
        id:1 ,
        // eslint-disable-next-line jsx-a11y/alt-text
        image:<img src={template2}/>
    },
    {
        title: "Template three",
        id:1 ,
        // eslint-disable-next-line jsx-a11y/alt-text
        image:<img src={template3}/>
    }
]

export const designs=[
    {
        title: "Design one",
        id:1 ,
        // eslint-disable-next-line jsx-a11y/alt-text
        image:<img src={design1}/>
    },
    {
        title: "Design two",
        id:1 ,
        // eslint-disable-next-line jsx-a11y/alt-text
        image:<img src={design2}/>
    },
]