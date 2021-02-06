from flask_wtf import FlaskForm
from wtforms import StringField, FloatField
from wtforms.validators import InputRequired, Optional


class AddCupcakeForm(FlaskForm):
    """Form for adding cupcakes"""

    flavor = StringField("Cupcake Flavor", validators=[InputRequired()])
    size = StringField("Size", validators=[InputRequired()])
    rating = FloatField("Rating")
    image = StringField("Add Cupcake URL", validators=[Optional()])
