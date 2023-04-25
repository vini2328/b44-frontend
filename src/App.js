import { Button, Card, CardContent, CardMedia, Typography } from '@mui/material';
import './App.css';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import axios from "axios";
import SearchIcon from '@mui/icons-material/Search';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';


function App() {
  const [searchItem, setSearchItem] = useState('');
  const [searchResult, setSerchRes] = useState([]);

  const searchNow = (e) => {
    setSearchItem(e.target.value);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const searchResult = await axios.post('http://localhost:7000/searchitem', {
        searched_item: searchItem
      });
      console.log(searchResult.data); // Check if response data is coming in expected format
      setSerchRes(searchResult.data);
    } catch (error) {
      console.log(error);
      alert('Error fetching data. Please try again.'); // Display an error message to the user
    }
  };

  console.log(searchResult);
   // Check if state variable is being updated correctly

   

  return (
    
    <div>
          <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" className='vini' 
>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon sx={{color:"white"}} />
            <ShoppingCartIcon sx={{color:"white"}}/>
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Vini's Web Scrapper
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
    </Box>
      <Box className='searchkaro'
        component="form"
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          '& > :not(style)': { m: 6, width: '50ch' } 
        }}        noValidate
        autoComplete="off"
      >
        <div className="search-bar">
          <TextField
            id="outlined-basic"
            label="Search  Any Products"
            variant="outlined"
            onChange={searchNow}
            value={searchItem}
            className="search-input"
          />
          <Button variant="contained" color="primary" onClick={handleSearch} className="search-button">
            <SearchIcon  sx={{height:"40px"}}/>
          </Button>
        </div>
      </Box>
      <div>      
        
      {/* Search bar code... */}

      {/* Container for the cards */}
      <div className="card-container">
      {searchResult
    .filter((product) => product.productImg) 
    .slice(0, 40)
    .map((product) => (      
    <Card className="card" key={product.id}>
        <CardMedia
            className="card-img"
              component="img"
            height="200"
            image={product.productImg || "/NotFoundimg"} 
               alt={product.productTitle}
/>            <CardContent>
              <Typography className="card-title"  component="div">
                {product.productTitle}
              </Typography>
              <Typography className="card-rating" variant="body2" color="text.secondary">
                {product.rating}
              </Typography>
              <Typography className="card-price" variant="h8">Rs {product.discountedprice}.00</Typography>
            </CardContent>
          </Card>
        ))}

{searchResult
    .filter((product) => product.s1) // Filter out products with empty s2 values
    .map((product) => (          
    <Card className="card" key={product.id}>
            <CardMedia className="card-img" component="img" height="200" image={product.s1} alt={product.productTitle} />
            <CardContent>
              <Typography className="card-title" gutterBottom variant="h6" component="div">
                {product.s2}
              </Typography>
            </CardContent>
          </Card>
        ))}

        {searchResult.length === 0 && <p>No products found.</p>}
      </div>
    </div>
  
    </div>
  );
}

export default App;
