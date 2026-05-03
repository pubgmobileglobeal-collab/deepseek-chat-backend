package com.hitman.app

import android.os.Bundle
import android.widget.*
import androidx.appcompat.app.AppCompatActivity

class MainActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        val layout = LinearLayout(this)
        layout.orientation = LinearLayout.VERTICAL

        val title = TextView(this)
        title.text = "Hitman Missions"
        title.textSize = 24f

        val mission = TextView(this)
        mission.text = "Target: Unknown\nStatus: Pending"

        val button = Button(this)
        button.text = "Start Mission"

        button.setOnClickListener {
            mission.text = "Target Eliminated ✅"
        }

        layout.addView(title)
        layout.addView(mission)
        layout.addView(button)

        setContentView(layout)
    }
}