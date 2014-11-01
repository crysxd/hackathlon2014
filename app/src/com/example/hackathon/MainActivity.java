package com.example.hackathon;

import it.gmariotti.cardslib.library.internal.Card;
import it.gmariotti.cardslib.library.internal.CardHeader;
import it.gmariotti.cardslib.library.internal.CardThumbnail;
import it.gmariotti.cardslib.library.view.CardView;
import android.app.ActionBar;
import android.app.Activity;
import android.os.Bundle;
import android.view.Menu;
import android.view.MenuItem;


public class MainActivity extends Activity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
		Card card = new Card(this, R.layout.classz);
		// Create a CardHeader
		CardHeader header = new CardHeader(this);
		header.setTitle("Hello world");
		
		card.setTitle("Simple card demo");
		CardThumbnail thumb = new CardThumbnail(this);
		thumb.setDrawableResource(R.drawable.ic_launcher);
		 
		card.addCardThumbnail(thumb);
		
		// Add Header to card
		card.addCardHeader(header);
		
	    // Set card in the cardView
		CardView cardView = (CardView) findViewById(R.id.);
		cardView.setCard(card);
        
    }


    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        // Inflate the menu; this adds items to the action bar if it is present.
        getMenuInflater().inflate(R.menu.main, menu);
        return true;
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        // Handle action bar item clicks here. The action bar will
        // automatically handle clicks on the Home/Up button, so long
        // as you specify a parent activity in AndroidManifest.xml.
        int id = item.getItemId();
//        if (id == R.id.action_settings) {
//            return true;
//        }
        return super.onOptionsItemSelected(item);
    }
}
