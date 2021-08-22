import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import ButtonBase from '@material-ui/core/ButtonBase'
import { Button } from '@material-ui/core'
import Axios from './config/axios'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    margin: '2em auto',
    maxWidth: 500,
  },
  image: {
    width: 128,
    height: 128,
  },
  img: {
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  },
}))

export default function App() {
  const [loading, setLoading] = useState(false)

  const classes = useStyles()

  // fires on on by now press
  const buyHandler = (id) => {
    setLoading(true)
    Axios.post('/apiv1/order/create', { id })
      .then(({ data }) => {
        var options = {
          key: data.key, // Enter the Key ID generated from the Dashboard
          amount: data.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
          currency: 'INR',
          name: 'AKSHAY KUMAR SINGH',
          description: data.name,
          image: 'https://avatars.githubusercontent.com/u/43178939?v=4',
          order_id: data.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
          handler: function (response) {
            alert('Your payment is success')
          },
          prefill: {
            name: 'New User',
            email: 'newuser@example.com',
            contact: '9999999999',
          },
          notes: {
            address: 'new plance',
          },
          theme: {
            color: '#3399cc',
          },
        }
        var rzp1 = new window.Razorpay(options)
        rzp1.on('payment.failed', function (response) {
          alert(response.error.code)
          alert(response.error.description)
          alert(response.error.source)
          alert(response.error.step)
          alert(response.error.metadata.order_id)
          alert(response.error.metadata.payment_id)
        })
        rzp1.open()
        setLoading(false)
      })
      .catch((err) => {
        console.log(
          err.response && err.response.data
            ? err.response.data
            : err.response.data.message
            ? err.response.data.message
            : err.message
        )
        setLoading(false)
      })
  }
  return (
    <div className={classes.root}>
      {[
        { name: 'Samose', price: 20, id: 1234 },
        { name: 'Burger', price: 50, id: 5678 },
        { name: 'Pizza', price: 100, id: 9012 },
      ].map((product) => (
        <Paper className={classes.paper}>
          <Grid container spacing={2}>
            <Grid item>
              <ButtonBase className={classes.image}>
                <img
                  className={classes.img}
                  alt="complex"
                  src={`/images/${product.name}.jpg`}
                />
              </ButtonBase>
            </Grid>
            <Grid item xs={12} sm container>
              <Grid item xs container direction="column" spacing={2}>
                <Grid item xs>
                  <Typography gutterBottom variant="subtitle1">
                    {product.name}
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    This is {product.name} description
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    ID: {product.id}
                  </Typography>
                </Grid>
                <Grid item>
                  <Button
                    variant="outlined"
                    onClick={() => buyHandler(product.id)}
                  >
                    {loading ? (
                      <i className="fas fa-spinner fa-spin"></i>
                    ) : (
                      'Buy Now'
                    )}
                  </Button>
                </Grid>
              </Grid>
              <Grid item>
                <Typography variant="subtitle1">
                  INR {product.price.toFixed(2)}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      ))}
    </div>
  )
}
