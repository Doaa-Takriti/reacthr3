import React from 'react';
import { Tree, TreeNode } from 'react-organizational-chart';
import styled from 'styled-components';
import { ThemeContext } from "../context/themeContext";


const StyledNode = styled.div`
background-color:white;
border-radius: 8px;
display: inline-block;
border: 0.2rem solid #fff;
overflow:hidden;
transition:all ease-in-out .5s;
cursor:pointer
;
box-shadow: -1px 2px 7px 0px rgba(0, 0, 0, 0.2);
-webkit-box-shadow: -1px 2px 7px 0px rgba(0, 0, 0, 0.2);
-moz-box-shadow: -1px 2px 7px 0px rgba(0, 0, 0, 0.2);
&:hover{
  box-shadow: 0 0 .2rem #fff,

0 0 .2rem #fff,
0 0 2rem #EA8D56,
0 0 0.8rem #EA8D56,
0 0 3.8rem #EA8D56,
inset 0 0 0.3rem #EA8D56;
}
 


`

function Organizational() {

  const { toggleNavbar } = React.useContext(ThemeContext);

    return (
        <div className={toggleNavbar ? "contetleft" : "content"}>
           <div style={{marginTop: '100px'}}>
            <div style={{width:'100%',overflowX:'scroll',padding:'30px'}}>
           <Tree
    lineWidth={'2px'}
    lineColor={'#222'}
    lineBorderRadius={'10px'}
    label={<StyledNode>
      <div className="managment">

      <img src="https://th.bing.com/th/id/R.286b34c5d197192938aa25f609e0181c?rik=pYtyYJjjXLeYJg&pid=ImgRaw&r=0" />
      <div className="manag-detais">
        <h3>mohammed ahmad</h3>
        <h5>manager</h5>

      </div>

      </div>
      <div className="line-managment">

      </div>
    </StyledNode>}
  >
    <TreeNode label={<StyledNode>      <div className="managment">

<img src="https://www.netclipart.com/pp/m/135-1353105_img-avatar-2-png-illustration.png" />
<div className="manag-detais">
  <h3>mohammed ahmad</h3>
  <h5>manager</h5>

</div>

</div>
<div className="line-managment">

</div></StyledNode>}>
      <TreeNode label={<StyledNode>      <div className="managment">

<img src="https://th.bing.com/th/id/OIP.2vsr1hfLaHGskBUjrLWVjQAAAA?pid=ImgDet&w=240&h=300&rs=1" />
<div className="manag-detais">
  <h3>mohammed ahmad</h3>
  <h5>manager</h5>

</div>

</div>
<div className="line-managment">

</div></StyledNode>} />
    </TreeNode>
    <TreeNode label={<StyledNode>      <div className="managment">

<img src="https://clikngo.com/wp-content/uploads/2019/05/man4.jpg" />
<div className="manag-detais">
  <h3>mohammed ahmad</h3>
  <h5>manager</h5>

</div>

</div>
<div className="line-managment">

</div></StyledNode>}>
      <TreeNode label={<StyledNode>      <div className="managment">

<img src="https://th.bing.com/th/id/R.286b34c5d197192938aa25f609e0181c?rik=pYtyYJjjXLeYJg&pid=ImgRaw&r=0" />
<div className="manag-detais">
  <h3>mohammed ahmad</h3>
  <h5>manager</h5>

</div>

</div>
<div className="line-managment">

</div></StyledNode>}>
        <TreeNode label={<StyledNode>      <div className="managment">

<img src="https://th.bing.com/th/id/R.286b34c5d197192938aa25f609e0181c?rik=pYtyYJjjXLeYJg&pid=ImgRaw&r=0" />
<div className="manag-detais">
  <h3>mohammed ahmad</h3>
  <h5>manager</h5>

</div>

</div>
<div className="line-managment">

</div></StyledNode>} />
        <TreeNode label={<StyledNode>      <div className="managment">

<img src="https://th.bing.com/th/id/R.286b34c5d197192938aa25f609e0181c?rik=pYtyYJjjXLeYJg&pid=ImgRaw&r=0" />
<div className="manag-detais">
  <h3>mohammed ahmad</h3>
  <h5>manager</h5>

</div>

</div>
<div className="line-managment">

</div></StyledNode>} />
      </TreeNode>
    </TreeNode>
    <TreeNode label={<StyledNode>      <div className="managment">

<img src="https://th.bing.com/th/id/R.286b34c5d197192938aa25f609e0181c?rik=pYtyYJjjXLeYJg&pid=ImgRaw&r=0" />
<div className="manag-detais">
  <h3>mohammed ahmad</h3>
  <h5>manager</h5>

</div>

</div>
<div className="line-managment">

</div></StyledNode>}>
      <TreeNode label={<StyledNode>      <div className="managment">

<img src="https://th.bing.com/th/id/R.286b34c5d197192938aa25f609e0181c?rik=pYtyYJjjXLeYJg&pid=ImgRaw&r=0" />
<div className="manag-detais">
  <h3>mohammed ahmad</h3>
  <h5>manager</h5>

</div>

</div>
<div className="line-managment">

</div></StyledNode>} />
      <TreeNode label={<StyledNode>      <div className="managment">

<img src="https://th.bing.com/th/id/R.286b34c5d197192938aa25f609e0181c?rik=pYtyYJjjXLeYJg&pid=ImgRaw&r=0" />
<div className="manag-detais">
  <h3>mohammed ahmad</h3>
  <h5>manager</h5>

</div>

</div>
<div className="line-managment">

</div></StyledNode>} />
    </TreeNode>
  </Tree>          </div>
            </div>
            </div>

        )
    }
    
    export default Organizational;
    