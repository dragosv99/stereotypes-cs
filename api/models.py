# pylint: disable=invalid-name, too-many-arguments
""" Models for the database schema."""
from flask_bcrypt import generate_password_hash
from api import db


class User(db.Model):
    """Class that contains database schema for User table."""
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), nullable=False, unique=True)
    password = db.Column(db.String(80), nullable=False)

    def __init__(self, name=None, password=None):
        self.username = name
        self.password = password

    @staticmethod
    def create_user(username, password):
        """
        Method to create a new user instance in the database.

        Parameters:
        username (string): user's username
        password (string): user's password

        Raise exception and rollback transaction if failed to add a new user to the database.
        Close connection if insertion is successful.

        """
        hashed_pw = generate_password_hash(password).decode('utf-8')
        try:
            db.session.add(User(username, hashed_pw))
            db.session.commit()
        except:
            db.session.rollback()
            raise
        finally:
            db.session.close()

    def __repr__(self):
        return '<User %r>' % self.username


class Consent(db.Model):
    """Class that contains information from the consent forms"""
    id = db.Column(db.Integer, primary_key=True)
    childFirstName = db.Column(db.String(80), nullable=False)
    childLastName = db.Column(db.String(80), nullable=False)
    parentFirstName = db.Column(db.String(80), nullable=False)
    parentLastName = db.Column(db.String(80), nullable=False)
    signature = db.Column(db.Text(), nullable=False)

    def __init__(self, child_first_name, child_last_name,
                 parent_first_name, parent_last_name, signature):
        self.childFirstName = child_first_name
        self.childLastName = child_last_name
        self.parentFirstName = parent_first_name
        self.parentLastName = parent_last_name
        self.signature = signature

    @staticmethod
    def create_consent(child_first_name, child_last_name,
                       parent_first_name, parent_last_name, signature):
        """Creates a consent form row in the database"""
        consent = Consent(child_first_name, child_last_name,
                          parent_first_name, parent_last_name, signature)
        try:
            db.session.add(consent)
            db.session.commit()
        except:
            db.session.rollback()
            raise
        finally:
            db.session.close()

    def __repr__(self):
        return '<Consent form id: %r>' % self.id